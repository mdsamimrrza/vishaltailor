@echo off
setlocal
start "Tailor Frontend" cmd /k "%~dp0dev-frontend.cmd"
start "Tailor API" cmd /k "%~dp0dev-api.cmd"
