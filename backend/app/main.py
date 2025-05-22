from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.database import engine
from .models import models
from .routes import auth, businesses, reviews

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Business Book API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(businesses.router, prefix="/api/businesses", tags=["businesses"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["reviews"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Business Book API"} 