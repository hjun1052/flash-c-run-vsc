# Flash Run C/C++
C compile &amp; runner for VSCode

## How to install
### 1. Install in VSCode
Open VSCode app, and search "Flash Run C/C++" in VSCode MarketPlace, then click "Install".
### 2. Download via MarketPlace Link
[click here](https://github.com/hjun1052/flash-run-c-vsc/releases) and click install button.
### 3. Install via GitHub
You can download in [this page](https://github.com/hjun1052/flash-run-c-vsc/releases). When you finished downloading, click ··· button on top of the MarketPlace window, then select "Install from VSIX", and browse the downloaded .VSIX file and open it.

## How to use
### One-click Compile&Run
Open any C/C++ file, and press `▶️ Flash Run C⚡️` button located at the tab bar. It will automatically compile and run your C/C++ code.
### Run selected lines
Select lines of codes to run, then right-click on it and click `⚡ Flash Run Selected Lines (Experimental)`.
This feature basically makes and run the temporary file which includes all the header files and pre-defined functions, and selected code lines inserted in the main() function.
### Run with input
1. Right-click on anywhere of your C/C++ editor screen.
2. Click `[C/C++ ⚡️] Run C/C++ with Input (Experimental)`.
3. Enter your stdin input and press `enter`. Your code will be compiled & run instantly.
### Run all testcases
1. Create `input.txt` and `output.txt` files in the same directory as your C/C++ file.
2. Each line in `input.txt` represents a separate test case input.
3. Each corresponding line in `output.txt` should contain the expected output for the same test case.
4. Open your source file in VS Code.
5. Open the Command Palette (⇧⌘P or Ctrl+Shift+P) and run:  
   `Flash Run C: Run All Test Cases`
6. The extension will compile your program, execute each test case, and compare results.
7. Pass/fail results will be shown for each test, and a summary will be displayed.


## How to change settings
Open VSCode Settings, and search "flash run c" at the search bar. You can find various settings you can change.

### See more information at [MarketPlace](https://marketplace.visualstudio.com/items?itemName=hjun1052.flash-run-c).
