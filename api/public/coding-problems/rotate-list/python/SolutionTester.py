import json

# Helper function to convert a list to a linked list
def list_to_linkedlist(lst):
    dummy = ListNode()
    current = dummy
    for value in lst:
        current.next = ListNode(value)
        current = current.next
    return dummy.next

# Helper function to convert a linked list to a list
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
        input_list = stringToIntegerList(lines[i].strip())
        k = int(lines[i + 1].strip())
        expected = stringToIntegerList(lines[i + 2].strip())
        i += 3

        # Convert input list to a linked list
        head = list_to_linkedlist(input_list)

        # Run the solution method
        result_head = Solution().rotateRight(head, k)

        # Convert the result linked list to a list for easy comparison
        result_list = linkedlist_to_list(result_head)

        if result_list != expected:
            print(f"[Fail] List: {input_list}, Rotate by: {k}, Expected: {expected}, Got: {result_list}")
            passall = False
            break

    if passall:
        print(f"[Success] Your solution passed all {len(lines) // 3} test cases!")

if __name__ == '__main__':
    main()
