@echo off
for /r "pictures/%~1." %%A in (*.*) do if %%~zA == 0 del "%%~fA"