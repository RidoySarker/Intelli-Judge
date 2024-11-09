class Solution(object):
    def minWindow(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: str
        """
        if not s or not t:
            return ""

        # Count characters in t
        t_count = {}
        for char in t:
            t_count[char] = t_count.get(char, 0) + 1

        # Initialize window
        window_count = {}
        have, need = 0, len(t_count)
        res, res_len = [-1, -1], float("inf")
        left = 0

        # Expand window by moving the right pointer
        for right in range(len(s)):
            char = s[right]
            window_count[char] = window_count.get(char, 0) + 1

            if char in t_count and window_count[char] == t_count[char]:
                have += 1

            # Contract the window by moving the left pointer
            while have == need:
                # Update result
                if (right - left + 1) < res_len
                    res = [left, right]
                    res_len = right - left + 1

                # Pop the left character from window
                window_count[s[left]] -= 1
                if s[left] in t_count and window_count[s[left]] < t_count[s[left]]:
                    have -= 1
                left += 1

        left, right = res
        return s[left:right+1] if res_len != float("inf") else ""
