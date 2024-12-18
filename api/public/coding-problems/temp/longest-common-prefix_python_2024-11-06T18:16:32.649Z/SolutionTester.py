import json
import Solution

def stringToIntegerList(input):
    return json.loads(input)

def stringToInt(input):
    return int(input)

def integerListToString(nums, len_of_list=None):
    if not len_of_list:
        len_of_list = len(nums)
    return json.dumps(nums[:len_of_list])

def main():
    with open('testcase.txt', "r") as f:
        lines = f.readlines()
    i = 0
    passall = True
    while i < len(lines) :
        line = lines[i].replace("\n","")
        strs = None
        if (line != "null") :
            strs = line.replace("[","").replace("]","").replace("\n","").split(",")
        #print strs
        line = lines[i+1]
        #print line
        expected = line.replace("\n","")
        
        ret = Solution.Solution().longestCommonPrefix(strs)
        #print "expected:" + expected
        #print "ret:" + ret
        if (expected == '""' and ret == "") :
            i += 2
            continue
  
        if (expected != ret) :
            if (strs is None) :
                strnums = 'null'
            else:
                strnums = ''.join(strs)
            print "[Fail]" + strnums + ";" + ret + ";" + expected
            passall = False
            break

        i = i + 2

    if passall == True :
        print "[Success]Your solution passed all " + str(len(lines)/2) + " test cases!"

if __name__ == '__main__':
    main()