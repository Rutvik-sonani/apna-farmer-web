# PowerShell script to help fix remaining ESLint errors
# This script provides commands to fix common patterns

Write-Host "ESLint Fix Helper Script" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green
Write-Host ""

# Files with unused 'api' import (not actually using it)
$filesWithUnusedApi = @(
    "src\pages\Dashboard\Buyers\Buyers.tsx",
    "src\pages\Dashboard\CropDetails\CropDetails.tsx",
    "src\pages\Dashboard\Farmers\Farmers.tsx",
    "src\pages\Dashboard\MyCrops\MyCrops.tsx",
    "src\pages\Dashboard\Sell\SellCrop.tsx"
)

Write-Host "Files with unused 'api' import:" -ForegroundColor Yellow
$filesWithUnusedApi | ForEach-Object { Write-Host "  - $_" }
Write-Host ""

# Files with unused 'endPoints' import
$filesWithUnusedEndPoints = @(
    "src\pages\Dashboard\CropDetails\CropDetails.tsx",
    "src\pages\Dashboard\MyCrops\MyCrops.tsx",
    "src\pages\Dashboard\Sell\SellCrop.tsx"
)

Write-Host "Files with unused 'endPoints' import:" -ForegroundColor Yellow
$filesWithUnusedEndPoints | ForEach-Object { Write-Host "  - $_" }
Write-Host ""

Write-Host "Run 'npm run lint' to see current status" -ForegroundColor Cyan
