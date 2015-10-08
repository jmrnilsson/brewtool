@echo off
rem Add intiger arg for sensing simulation. To start, approximately 1000 ms (= 1 Hz) per 
rem normal operation. For performance benchmarks this could decreased. Though,
rem most temperature sensor can not provide accurate readings at lower than 40 Hz (25 
rem ms) at a time. So the is little point in going any lower. 
node fdaemon.js
echo.
pause
cls