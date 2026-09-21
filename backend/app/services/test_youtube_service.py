import pytest

from app.services.youtube_service import search_youtube



@pytest.mark.anyio
async def test_search_youtube():
    videos = await search_youtube("Lagos Nigeria weather")

    assert isinstance(videos, list)
    assert len(videos) > 0

    video = videos[0]

    assert "video_id" in video
    assert "title" in video
    assert "description" in video
    assert "channel" in video
    assert "thumbnail" in video
    assert "url" in video