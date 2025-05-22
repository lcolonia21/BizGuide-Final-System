from sqlalchemy.orm import Session
from typing import List, Optional
from ..models import models
from ..models.schemas import BusinessCreate

class BusinessService:
    @staticmethod
    def create_business(db: Session, business: BusinessCreate, owner_id: int) -> models.Business:
        db_business = models.Business(**business.dict(), owner_id=owner_id)
        db.add(db_business)
        db.commit()
        db.refresh(db_business)
        return db_business

    @staticmethod
    def get_business(db: Session, business_id: int) -> Optional[models.Business]:
        return db.query(models.Business).filter(models.Business.id == business_id).first()

    @staticmethod
    def get_businesses(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        category: Optional[str] = None
    ) -> List[models.Business]:
        query = db.query(models.Business)
        if category:
            query = query.filter(models.Business.category == category)
        return query.offset(skip).limit(limit).all()

    @staticmethod
    def get_user_businesses(
        db: Session, 
        owner_id: int,
        skip: int = 0, 
        limit: int = 100
    ) -> List[models.Business]:
        return db.query(models.Business)\
            .filter(models.Business.owner_id == owner_id)\
            .offset(skip)\
            .limit(limit)\
            .all()

    @staticmethod
    def update_business(
        db: Session, 
        business_id: int, 
        business_data: dict
    ) -> Optional[models.Business]:
        db_business = BusinessService.get_business(db, business_id)
        if db_business:
            for key, value in business_data.items():
                setattr(db_business, key, value)
            db.commit()
            db.refresh(db_business)
        return db_business

    @staticmethod
    def delete_business(db: Session, business_id: int) -> bool:
        db_business = BusinessService.get_business(db, business_id)
        if db_business:
            db.delete(db_business)
            db.commit()
            return True
        return False 