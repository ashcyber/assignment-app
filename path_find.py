import math
x = int(input("Enter x value: "))
y = int(input("Enter y value: "))

cur_x = cur_y = 0

max_val = {
    "NE" : 3,
    "SE" : 4,
    "NW" : 5,
    "SW" : 2
}

dict = {
   "NE" : [1,1,3],
   "SE" : [1,-1,4],
   "NW" : [-1,1,5],
   "SW" : [-1,-1,2]
}

max_reached = False 

def reset_val():
    for dir in dict:
        dict[dir][2] = max_val[dir]


def find_distance(x,y,x2,y2):
    return math.sqrt(math.pow(int(x2)-int(x),2) + math.pow(int(y2)-int(y),2))


print()
print("Insect Moves")
print("===============================")
while find_distance(cur_x,cur_y,x,y) > 1:
    min_dist = float('inf')
    min_dir = ""

    for dir in dict:
        if(dict[dir][2] != 0):                
            diff_dis = find_distance(cur_x + dict[dir][0], cur_y + dict[dir][1], x, y)
            if(diff_dis < min_dist):
                min_dist = diff_dis
                min_dir = dir

    if(max_reached == True):
        max_reached = False
        reset_val()

    if(min_dir != ""):
        cur_x = cur_x + dict[min_dir][0]
        cur_y = cur_y + dict[min_dir][1]
        dict[min_dir][2] = dict[min_dir][2] - 1


    if(max_reached == False and dict[min_dir][2] == 0):
        max_reached = True
        
    print(min_dir)
print("==============================")

print("x-pos " + str(cur_x))
print("y-pos " + str(cur_y))
        
