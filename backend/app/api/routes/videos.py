from fastapi import APIRouter, HTTPException, Query

from app.services.youtube_service import search_youtube

router = APIRouter(
    prefix="/videos",
    tags=["Videos"]
)



@router.get("/")
async def get_videos(
    query: str = Query(..., min_length=2),
    max_results: int = Query(5, ge=1, le=10),
):
    try:
        videos = await search_youtube(
            query=query,
            max_results=max_results,
        )

        return {
            "query": query,
            "videos": videos,
        }

    except Exception:
        raise HTTPException(
            status_code = 502,
            detail="Unable to fetch YouTube videos"
        )