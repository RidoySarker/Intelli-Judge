# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def rotateRight(self, head, k):
        """
        :type head: ListNode
        :type k: int
        :rtype: ListNode
        """
        if not head or not head.next or k == 0:
            return head

        # First, determine the length of the list
        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1

        # Connect the tail to the head to form a circle
        tail.next = head

        # Calculate the effective rotations needed
        k = k % length
        steps_to_new_head = length - k

        # Find the new head and tail
        new_tail = head
        for _ in range(steps_to_new_head - 1):
            new_tail = new_tail.next

        new_head = new_tail.next
        new_tail.next = None  # Break the circle

        return new_head
