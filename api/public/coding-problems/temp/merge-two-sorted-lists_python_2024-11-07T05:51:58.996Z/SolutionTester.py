import json
import Solution

# Helper function to convert list to linked list
def list_to_linkedlist(lst):
    dummy = ListNode()
    current = dummy
    for value in lst:
        current.next = ListNode(value)
        current = current.next
    return dummy.next

# Helper function to convert linked list to list
def linkedlist_to_list(node):
    result = []
    while node:
        result.append(node.val)
        node = node.next
    return result

def stringToIntegerList(input):
    return json.loads(input)

def main():
    with open('testcase.txt', "r") as f:
        lines = f.readlines()
    
    i = 0
    passall = True
    while i < len(lines):
        list1 = stringToIntegerList(lines[i].strip())
        list2 = stringToIntegerList(lines[i + 1].strip())
        expected = stringToIntegerList(lines[i + 2].strip())
        i += 3

        # Convert input lists to linked lists
        list1_node = list_to_linkedlist(list1)
        list2_node = list_to_linkedlist(list2)

        # Run the solution method
        result_node = Solution.Solution().mergeTwoLists(list1_node, list2_node)

        # Convert the result linked list to a list
        result_list = linkedlist_to_list(result_node)

        if result_list != expected:
            print(f"[Fail] Lists: {list1} and {list2}, Expected: {expected}, Got: {result_list}")
            passall = False
            break

    if passall:
        print(f"[Success] Your solution passed all {len(lines) // 3} test cases!")

if __name__ == '__main__':
    main()
