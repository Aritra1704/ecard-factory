"""Editable operator configuration APIs."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.operator_config import (
    OperatorOptionCatalogResponse,
    OperatorOptionCreate,
    OperatorOptionDeleteResponse,
    OperatorOptionResponse,
    OperatorOptionUpdate,
)
from app.services.operator_option_service import OperatorOptionService, get_operator_option_service

router = APIRouter(prefix="/api/config", tags=["operator-config"])


@router.get("/options", response_model=OperatorOptionCatalogResponse)
async def list_operator_options(
    include_inactive: bool = Query(default=False),
    db: AsyncSession = Depends(get_db),
    service: OperatorOptionService = Depends(get_operator_option_service),
) -> OperatorOptionCatalogResponse:
    """Return grouped dropdown options for operator-facing UI forms."""

    return await service.list_options(db, include_inactive=include_inactive)


@router.post("/options", response_model=OperatorOptionResponse, status_code=status.HTTP_201_CREATED)
async def create_operator_option(
    payload: OperatorOptionCreate,
    db: AsyncSession = Depends(get_db),
    service: OperatorOptionService = Depends(get_operator_option_service),
) -> OperatorOptionResponse:
    """Create one new editable operator option row."""

    return await service.create_option(db, payload)


@router.put("/options/{option_id}", response_model=OperatorOptionResponse)
async def update_operator_option(
    option_id: int,
    payload: OperatorOptionUpdate,
    db: AsyncSession = Depends(get_db),
    service: OperatorOptionService = Depends(get_operator_option_service),
) -> OperatorOptionResponse:
    """Update one existing operator option row."""

    return await service.update_option(db, option_id, payload)


@router.delete("/options/{option_id}", response_model=OperatorOptionDeleteResponse)
async def delete_operator_option(
    option_id: int,
    db: AsyncSession = Depends(get_db),
    service: OperatorOptionService = Depends(get_operator_option_service),
) -> OperatorOptionDeleteResponse:
    """Soft-delete one operator option row by deactivating it."""

    return await service.delete_option(db, option_id)
