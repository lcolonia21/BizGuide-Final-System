from sqlalchemy.orm import Session
from typing import List, Optional
from ..models import models
from ..models.schemas import ReviewCreate

class ReviewService:
    @staticmethod
    def create_review(db: Session, review: ReviewCreate, user_id: int) -> models.Review:
        db_review = models.Review(**review.dict(), user_id=user_id)
        db.add(db_review)
        db.commit()
        db.refresh(db_review)
        return db_review

    @staticmethod
    def get_review(db: Session, review_id: int) -> Optional[models.Review]:
        return db.query(models.Review).filter(models.Review.id == review_id).first()

    @staticmethod
    def get_business_reviews(
        db: Session, 
        business_id: int,
        skip: int = 0, 
        limit: int = 100
    ) -> List[models.Review]:
        return db.query(models.Review)\
            .filter(models.Review.business_id == business_id)\
            .offset(skip)\
            .limit(limit)\
            .all()

    @staticmethod
    def get_user_reviews(
        db: Session, 
        user_id: int,
        skip: int = 0, 
        limit: int = 100
    ) -> List[models.Review]:
        return db.query(models.Review)\
            .filter(models.Review.user_id == user_id)\
            .offset(skip)\
            .limit(limit)\
            .all()

    @staticmethod
    def update_review(
        db: Session, 
        review_id: int, 
        review_data: dict
    ) -> Optional[models.Review]:
        db_review = ReviewService.get_review(db, review_id)
        if db_review:
            for key, value in review_data.items():
                setattr(db_review, key, value)
            db.commit()
            db.refresh(db_review)
        return db_review

    @staticmethod
    def delete_review(db: Session, review_id: int) -> bool:
        db_review = ReviewService.get_review(db, review_id)
        if db_review:
            db.delete(db_review)
            db.commit()
            return True
        return False

    @staticmethod
    def get_business_average_rating(db: Session, business_id: int) -> float:
        reviews = ReviewService.get_business_reviews(db, business_id)
        if not reviews:
            return 0.0
        return sum(review.rating for review in reviews) / len(reviews) 