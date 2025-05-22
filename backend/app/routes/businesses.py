from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database.database import get_db
from ..models.schemas import Business, BusinessCreate
from ..services.business_service import BusinessService
from ..services.user_service import UserService
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/", response_model=Business)
def create_business(
    business: BusinessCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = UserService.get_current_user(db, token)
    return BusinessService.create_business(db=db, business=business, owner_id=current_user.id)

@router.get("/", response_model=List[Business])
def read_businesses(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    businesses = BusinessService.get_businesses(db, skip=skip, limit=limit, category=category)
    return businesses

@router.get("/{business_id}", response_model=Business)
def read_business(business_id: int, db: Session = Depends(get_db)):
    db_business = BusinessService.get_business(db, business_id=business_id)
    if db_business is None:
        raise HTTPException(status_code=404, detail="Business not found")
    return db_business

@router.put("/{business_id}", response_model=Business)
def update_business(
    business_id: int,
    business_data: dict,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = UserService.get_current_user(db, token)
    db_business = BusinessService.get_business(db, business_id)
    if db_business is None:
        raise HTTPException(status_code=404, detail="Business not found")
    if db_business.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return BusinessService.update_business(db, business_id, business_data)

@router.delete("/{business_id}")
def delete_business(
    business_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = UserService.get_current_user(db, token)
    db_business = BusinessService.get_business(db, business_id)
    if db_business is None:
        raise HTTPException(status_code=404, detail="Business not found")
    if db_business.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    if BusinessService.delete_business(db, business_id):
        return {"message": "Business deleted successfully"}
    raise HTTPException(status_code=500, detail="Failed to delete business") 