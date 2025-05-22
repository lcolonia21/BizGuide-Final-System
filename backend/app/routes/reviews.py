from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database.database import get_db
from ..models.schemas import Review, ReviewCreate
from ..services.review_service import ReviewService
from ..services.user_service import UserService
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/", response_model=Review)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = UserService.get_current_user(db, token)
    return ReviewService.create_review(db=db, review=review, user_id=current_user.id)

@router.get("/business/{business_id}", response_model=List[Review])
def read_business_reviews(
    business_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    reviews = ReviewService.get_business_reviews(db, business_id, skip=skip, limit=limit)
    return reviews

@router.get("/user/{user_id}", response_model=List[Review])
def read_user_reviews(
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    reviews = ReviewService.get_user_reviews(db, user_id, skip=skip, limit=limit)
    return reviews

@router.get("/{review_id}", response_model=Review)
def read_review(review_id: int, db: Session = Depends(get_db)):
    db_review = ReviewService.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return db_review

@router.put("/{review_id}", response_model=Review)
def update_review(
    review_id: int,
    review_data: dict,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = UserService.get_current_user(db, token)
    db_review = ReviewService.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    if db_review.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return ReviewService.update_review(db, review_id, review_data)

@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = UserService.get_current_user(db, token)
    db_review = ReviewService.get_review(db, review_id)
    if db_review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    if db_review.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    if ReviewService.delete_review(db, review_id):
        return {"message": "Review deleted successfully"}
    raise HTTPException(status_code=500, detail="Failed to delete review")

@router.get("/business/{business_id}/rating")
def get_business_rating(business_id: int, db: Session = Depends(get_db)):
    return {"average_rating": ReviewService.get_business_average_rating(db, business_id)} 