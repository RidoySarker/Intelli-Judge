class Solution(object):
    def removeDuplicates(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        if not nums:
            return 0

        # Initialize the index for the next unique element
        unique_index = 1

        for i in range(1, len(nums)):
            if nums[i] != nums[i - 1]:  # Found a new unique element
                nums[unique_index] = nums[i]
                unique_index += 1

        return unique_index  # Length of unique elements
