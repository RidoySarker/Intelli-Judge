class Solution(object):
    def singleNumber(self, nums):
        if not nums:  # This covers both None and empty list cases
            return 0  # Or raise an exception if that’s more appropriate
        res = 0
        for num in nums:
            res ^= num
        return res
