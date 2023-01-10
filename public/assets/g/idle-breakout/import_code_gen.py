# PLEASE READ ME!!!
#
# Hello!
# 
# Click on Run to start the generator.
#
# Hope you enjoy!
#


import base64

print("Welcome to the interactive \nIdle Breakout import code generator by 3kh0!\n\nPlease enter numbers for the questions.\n------------------------------------------")

print("What level you want to be on?")
level = input()

print("------------------------------------------\nHow much money do you want?")
money = input()

print("------------------------------------------\nHow much gold do you want?")
gold = input()

print("------------------------------------------\nHow many Black Boxes do you want?")
bb = input()

print("------------------------------------------\nHow many skillpoints do you want?")
sp = input()

encode = f"{level},{money},{gold},3,0,0,0,0,0,0,0,1,1,0,43595.78,999999,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{bb},0,0,0,1,{sp},1,0,0"
finalCode = encode.encode("UTF-8")
result = base64.b64encode(finalCode)

print("\nGenerating....")
print("------------------------------------------\nHere is your code:\n")
print(result)
print("\nCopy whats INSIDE the single quotes!\n\n------------------------------------------")
print("Idle Breakout import code generator by 3kh0.")
