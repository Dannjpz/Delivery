# clean-angular.ps1
Write-Host "Iniciando limpieza..." -ForegroundColor Yellow

Write-Host "Deteniendo procesos de Node..." -ForegroundColor Cyan
taskkill /F /IM node.exe 2>$null

Write-Host "Limpiando cachés y carpetas..." -ForegroundColor Cyan
npm cache clean --force
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".angular" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue

Write-Host "Reinstalando dependencias..." -ForegroundColor Cyan
npm install

Write-Host "¡Limpieza completada!" -ForegroundColor Green