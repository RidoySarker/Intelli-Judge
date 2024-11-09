class Solution(object):
    def searchInsert(self, nums, target):
        if nums is None:
            return 0
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2  # Use integer division
            if nums[mid] < target:
                l = mid + 1
            else:
                if nums[mid] == target and (mid == 0 or nums[mid - 1] != target):  # Check mid == 0 to avoid IndexError
                    return mid
                else:
                    r = mid - 1
        return l
