-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 09, 2024 at 06:18 AM
-- Server version: 8.0.39-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Intelli_judge`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `totp_secret` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `last_login` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `first_name`, `last_name`, `email`, `password`, `totp_secret`, `created_at`, `updated_at`, `last_login`) VALUES
(1, 'Ridoy', 'Sarker', 'csridoy42@gmail.com', '$2y$10$sPslml7cfRuSCrFA353D/.7nacNkRW2ZIyt4OEAW14b4rmCInLv/.', NULL, '2024-05-15 00:37:48.000', '2024-05-15 00:37:48.000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coding_challenges`
--

CREATE TABLE `coding_challenges` (
  `id` int NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `problem_statement` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `testcase` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `solution` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `solution_tester` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `template` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_approved` int NOT NULL DEFAULT '0',
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coding_challenges`
--

INSERT INTO `coding_challenges` (`id`, `title`, `question_type`, `level`, `problem_statement`, `testcase`, `solution`, `solution_tester`, `template`, `slug`, `is_approved`, `user_id`) VALUES
(1, 'Longest Common Prefix', 'number', 'beginner', '<p>Write a function to find the longest common prefix string amongst an array of strings.</p><p>If there is no common prefix, return an empty string \"\".</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> strs = [\"flower\",\"flow\",\"flight\"] <strong>Output:</strong> \"fl\"</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> strs = [\"dog\",\"racecar\",\"car\"] <strong>Output:</strong> \"\" <strong>Explanation:</strong> There is no common prefix among the input strings.</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>1 &lt;= strs.length &lt;= 200</li><li>0 &lt;= strs[i].length &lt;= 200</li><li>strs[i] consists of only lowercase English letters.</li></ul>', 'null\n\"\"\n[a]\na\n[\"\",abc,abb]\n\"\"\n[a,b,c]\n\"\"\n[a,a,a]\na\n[abc,ab,ab]\nab\n[abcdef,abc,abb]\nab\n[abcdef,abce,abc123]\nabc', 'class Solution(object):\r\n    def longestCommonPrefix(self, strs):\r\n        \"\"\"\r\n        :type strs: List[str]\r\n        :rtype: str\r\n        \"\"\"\r\n        if strs is None :\r\n            return \"\"\r\n        if not strs:\r\n            return \"\"\r\n        shortest = min(strs,key=len)\r\n        for i, ch in enumerate(shortest):\r\n            for other in strs:\r\n                if other[i] != ch:\r\n                    return shortest[:i]\r\n        return shortest', 'import json\r\nimport Solution\r\n\r\ndef stringToIntegerList(input):\r\n    return json.loads(input)\r\n\r\ndef stringToInt(input):\r\n    return int(input)\r\n\r\ndef integerListToString(nums, len_of_list=None):\r\n    if not len_of_list:\r\n        len_of_list = len(nums)\r\n    return json.dumps(nums[:len_of_list])\r\n\r\ndef main():\r\n    with open(\'testcase.txt\', \"r\") as f:\r\n        lines = f.readlines()\r\n    i = 0\r\n    passall = True\r\n    while i < len(lines) :\r\n        line = lines[i].replace(\"\\n\",\"\")\r\n        strs = None\r\n        if (line != \"null\") :\r\n            strs = line.replace(\"[\",\"\").replace(\"]\",\"\").replace(\"\\n\",\"\").split(\",\")\r\n        #print strs\r\n        line = lines[i+1]\r\n        #print line\r\n        expected = line.replace(\"\\n\",\"\")\r\n        \r\n        ret = Solution.Solution().longestCommonPrefix(strs)\r\n        #print \"expected:\" + expected\r\n        #print \"ret:\" + ret\r\n        if (expected == \'\"\"\' and ret == \"\") :\r\n            i += 2\r\n            continue\r\n  \r\n        if (expected != ret) :\r\n            if (strs is None) :\r\n                strnums = \'null\'\r\n            else:\r\n                strnums = \'\'.join(strs)\r\n            print \"[Fail]\" + strnums + \";\" + ret + \";\" + expected\r\n            passall = False\r\n            break\r\n\r\n        i = i + 2\r\n\r\n    if passall == True :\r\n        print \"[Success]Your solution passed all \" + str(len(lines)/2) + \" test cases!\"\r\n\r\nif __name__ == \'__main__\':\r\n    main()', 'class Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        ', 'longest-common-prefix', 1, 1),
(2, 'Two Sum', 'number', 'expert', '<p>Given an array of integers nums&nbsp;and an integer target, return <i>indices of the two numbers such that they add up to target</i>.</p><p>You may assume that each input would have <i><strong>exactly</strong></i><strong> one solution</strong>, and you may not use the <i>same</i> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</p><p><strong>Example 3:</strong></p><p><strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>2 &lt;= nums.length &lt;= 104</li><li>-109 &lt;= nums[i] &lt;= 109</li><li>-109 &lt;= target &lt;= 109</li><li><strong>Only one valid answer exists.</strong></li></ul><p>&nbsp;</p><p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than O(n2)&nbsp;time complexity?</p>', 'null\n0\n[1]\n1\n[1,0,1]\n0\n[1,3,1,2,3]\n2\n[1,2,2,1,3,4,3]\n4', 'class Solution(object):\n    def twoSum(self, nums, target):\n        if nums is None :\n            return [0,0]\n        if len(nums) <= 1:\n            return [0,0]\n        buff_dict = {}\n        for i in range(len(nums)):\n            if nums[i] in buff_dict:\n                return [buff_dict[nums[i]], i]\n            else:\n                buff_dict[target - nums[i]] = i', 'import json\nimport Solution\n\ndef stringToIntegerList(input):\n    return json.loads(input)\n\ndef stringToInt(input):\n    return int(input)\n\ndef integerListToString(nums, len_of_list=None):\n    if not len_of_list:\n        len_of_list = len(nums)\n    return json.dumps(nums[:len_of_list])\n\ndef main():\n    with open(\'test-cases.txt\', \"r\") as f:\n        lines = f.readlines()\n    i = 0\n    passall = True\n    while i < len(lines) :\n        line = lines[i]\n        nums = stringToIntegerList(line)\n        if (nums == \"null\") :\n            nums = None\n        #print nums\n        line = lines[i+1]\n        #print line\n        target = stringToInt(line)\n        line = lines[i+2]\n        #print line\n        expected = stringToIntegerList(line)\n        \n        ret = Solution.Solution().twoSum(nums, target)\n\n        if (expected != ret) :\n            if (nums is None) :\n                strnums = \'null\'\n            else:\n                strnums = integerListToString(nums)\n            print (\"[Fail]\" + strnums + \", \" + str(target) + \";\" + integerListToString(ret) + \";\" + integerListToString(expected))\n            passall = False\n            break\n\n        i = i + 3\n        #print out\n\n    if passall == True :\n        print( \"[Success]Your solution passed all \" + str(len(lines)/3) + \" test cases!\")\n\nif __name__ == \'__main__\':\n    main()', 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ', 'two-sum', 1, NULL),
(3, 'Search Insert Position', 'array', 'intermediate', '<p>Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.</p><p>You must&nbsp;write an algorithm with&nbsp;O(log n) runtime complexity.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> nums = [1,3,5,6], target = 5 <strong>Output:</strong> 2</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> nums = [1,3,5,6], target = 2 <strong>Output:</strong> 1</p><p><strong>Example 3:</strong></p><p><strong>Input:</strong> nums = [1,3,5,6], target = 7 <strong>Output:</strong> 4</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>1 &lt;= nums.length &lt;= 104</li><li>-104 &lt;= nums[i] &lt;= 104</li><li>nums contains <strong>distinct</strong> values sorted in <strong>ascending</strong> order.</li><li>-104 &lt;= target &lt;= 104</li></ul>', 'null\n0\n0\n[]\n0\n0\n[1]\n0\n0\n[1]\n1\n0\n[1,2]\n3\n2\n[1,2]\n-1\n0\n[1,2]\n2\n1\n[1,2]\n1\n0\n[1,2,3,4,5,6,7,8,9]\n5\n4\n[1,2,3,4,5,6,7,8,9]\n10\n9\n[1,2,3,4,5,6,7,8,9]\n9\n8\n[1,5]\n4\n1\n[0,1,4,5]\n2\n2\n[1,3,5,6]\n5\n2\n[1,3,5,6]\n2\n1\n[1,3,5,6]\n7\n4', 'class Solution(object):\r\n    def searchInsert(self, nums, target):\r\n        if nums is None:\r\n            return 0\r\n        l, r = 0, len(nums) - 1\r\n        while l <= r:\r\n            mid = (l + r) // 2  # Use integer division\r\n            if nums[mid] < target:\r\n                l = mid + 1\r\n            else:\r\n                if nums[mid] == target and (mid == 0 or nums[mid - 1] != target):  # Check mid == 0 to avoid IndexError\r\n                    return mid\r\n                else:\r\n                    r = mid - 1\r\n        return l\r\n', 'import json\nimport Solution\n\ndef stringToIntegerList(input):\n    return json.loads(input)\n\ndef stringToInt(input):\n    return int(input)\n\ndef integerListToString(nums, len_of_list=None):\n    if not len_of_list:\n        len_of_list = len(nums)\n    return json.dumps(nums[:len_of_list])\n\ndef main():\n    with open(\'test-cases.txt\', \"r\") as f:\n        lines = f.readlines()\n    i = 0\n    passall = True\n    while i < len(lines) :\n        line = lines[i]\n        nums = stringToIntegerList(line)\n        if (nums == \"null\") :\n            nums = None\n        #print nums\n        line = lines[i+1]\n        #print line\n        target = stringToInt(line)\n        line = lines[i+2]\n        #print line\n        expected = int(line)\n        \n        ret = Solution.Solution().searchInsert(nums, target)\n\n        if (expected != ret) :\n            if (nums is None) :\n                strnums = \'null\'\n            else:\n                strnums = integerListToString(nums)\n            print \"[Fail]\" + strnums + \", \" + str(target) + \";\" + str(ret) + \";\" + str(expected)\n            passall = False\n            break\n\n        i = i + 3\n        #print out\n\n    if passall == True :\n        print \"[Success]Your solution passed all \" + str(len(lines)/3) + \" test cases!\"\n\nif __name__ == \'__main__\':\n    main()', 'class Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        ', 'search-insert-position', 1, NULL),
(4, 'Single Number', 'number', 'beginner', '<p>Given a <strong>non-empty</strong>&nbsp;array of integers nums, every element appears <i>twice</i> except for one. Find that single one.</p><p>You must&nbsp;implement a solution with a linear runtime complexity and use&nbsp;only constant&nbsp;extra space.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> nums = [2,2,1] <strong>Output:</strong> 1</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> nums = [4,1,2,1,2] <strong>Output:</strong> 4</p><p><strong>Example 3:</strong></p><p><strong>Input:</strong> nums = [1] <strong>Output:</strong> 1</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>1 &lt;= nums.length &lt;= 3 * 104</li><li>-3 * 104 &lt;= nums[i] &lt;= 3 * 104</li><li>Each element in the array appears twice except for one element which appears only once.</li></ul>', 'null\n0\n[1]\n1\n[1,0,1]\n0\n[1,3,1,2,3]\n2\n[1,2,2,1,3,4,3]\n4', 'class Solution(object):\r\n    def singleNumber(self, nums):\r\n        if not nums:  # This covers both None and empty list cases\r\n            return 0  # Or raise an exception if that’s more appropriate\r\n        res = 0\r\n        for num in nums:\r\n            res ^= num\r\n        return res\r\n', 'import json\nimport Solution\n\ndef stringToIntegerList(input):\n    return json.loads(input)\n\ndef stringToInt(input):\n    return int(input)\n\ndef integerListToString(nums, len_of_list=None):\n    if not len_of_list:\n        len_of_list = len(nums)\n    return json.dumps(nums[:len_of_list])\n\ndef main():\n    with open(\'test-cases.txt\', \"r\") as f:\n        lines = f.readlines()\n    i = 0\n    passall = True\n    while i < len(lines) :\n        line = lines[i]\n        nums = stringToIntegerList(line)\n        if (nums == \"null\") :\n            nums = None\n        #print nums\n        line = lines[i+1]\n        #print line\n        expected = int(line.replace(\"\\n\",\"\"))\n        \n        ret = Solution.Solution().singleNumber(nums)\n        #print expected\n        #print ret\n        if (expected != ret) :\n            if (nums is None) :\n                strnums = \'null\'\n            else:\n                strnums = integerListToString(nums)\n            print \"[Fail]\" + strnums + \";\" + str(ret) + \";\" + str(expected)\n            passall = False\n            break\n\n        i = i + 2\n        #print out\n\n    if passall == True :\n        print \"[Success]Your solution passed all \" + str(len(lines)/2) + \" test cases!\"\n\nif __name__ == \'__main__\':\n    main()', 'class Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        ', 'single-number', 1, NULL),
(5, 'Reverse String', 'string', 'intermediate', '<p>Write a function that reverses a string. The input string is given as an array of characters s.</p><p>You must do this by modifying the input array <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\">in-place</a> with O(1) extra memory.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> s = [\"h\",\"e\",\"l\",\"l\",\"o\"] <strong>Output:</strong> [\"o\",\"l\",\"l\",\"e\",\"h\"]</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"] <strong>Output:</strong> [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>1 &lt;= s.length &lt;= 105</li><li>s[i] is a <a href=\"https://en.wikipedia.org/wiki/ASCII#Printable_characters\">printable ascii character</a>.</li></ul>', 'null\n\"\"\n\"\"\n\"\"\n\"a\"\n\"a\"\n\"ab\"\n\"ba\"\n\"hello\"\n\"olleh\"', 'class Solution(object):\r\n    def reverseString(self, s):\r\n        if s is None:\r\n            return \"\"\r\n        l = len(s)\r\n        if l < 2:\r\n            return s\r\n        return self.reverseString(s[l // 2:]) + self.reverseString(s[:l // 2])\r\n', 'import json\r\nimport Solution\r\n\r\ndef stringToIntegerList(input):\r\n    return json.loads(input)\r\n\r\ndef stringToInt(input):\r\n    return int(input)\r\n\r\ndef integerListToString(nums, len_of_list=None):\r\n    if not len_of_list:\r\n        len_of_list = len(nums)\r\n    return json.dumps(nums[:len_of_list])\r\n\r\ndef main():\r\n    with open(\'testcase.txt\', \"r\") as f:\r\n        lines = f.readlines()\r\n    i = 0\r\n    passall = True\r\n    while i < len(lines) :\r\n        line = lines[i]\r\n        s = line.replace(\"\\n\",\"\")\r\n        if (s == \"null\") :\r\n            s = None\r\n        #print s\r\n        line = lines[i+1]\r\n        #print line\r\n        expected = line.replace(\"\\n\",\"\")\r\n        \r\n        ret = Solution.Solution().reverseString(s)\r\n\r\n        #print \"expected:\" + expected\r\n        #print \"ret:\" + ret\r\n        if (expected == \'\"\"\' and ret == \"\") :\r\n            i += 2\r\n            continue\r\n\r\n        if (expected != ret) :\r\n            if (s is None) :\r\n                strnums = \'null\'\r\n            else:\r\n                strnums = s\r\n            print (\"[Fail]\" + strnums + \";\" + ret + \";\" + expected)\r\n            passall = False\r\n            break\r\n\r\n        i = i + 2\r\n\r\n    if passall == True :\r\n        print (\"[Success]Your solution passed all \" + str(len(lines)/2) + \" test cases!\"\r\n)\r\nif __name__ == \'__main__\':\r\n    main()', 'class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        \"\"\"\n        Do not return anything, modify s in-place instead.\n        \"\"\"\n        ', 'reverse-string', 1, NULL),
(11, 'Wildcard Matching', 'string', 'intermediate', '<p>Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for \'?\' and \'*\' where:</p><ul><li>\'?\' Matches any single character.</li><li>\'*\' Matches any sequence of characters (including the empty sequence).</li></ul><p>The matching should cover the <strong>entire</strong> input string (not partial).</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> s = \"aa\", p = \"a\" <strong>Output:</strong> false <strong>Explanation:</strong> \"a\" does not match the entire string \"aa\".</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> s = \"aa\", p = \"*\" <strong>Output:</strong> true <strong>Explanation:</strong>&nbsp;\'*\' matches any sequence.</p><p><strong>Example 3:</strong></p><p><strong>Input:</strong> s = \"cb\", p = \"?a\" <strong>Output:</strong> false <strong>Explanation:</strong>&nbsp;\'?\' matches \'c\', but the second letter is \'a\', which does not match \'b\'.</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>0 &lt;= s.length, p.length &lt;= 2000</li><li>s contains only lowercase English letters.</li><li>p contains only lowercase English letters, \'?\' or \'*\'.</li></ul>', 'hello\nh*llo\ntrue\nabc\na*c\ntrue\nabcd\na?cd\ntrue\nabcde\na*d\nfalse\nabc\n?b*\ntrue\nabc\nabcd\nfalse', 'class Solution(object):\r\n    def isMatch(self, s, p):\r\n        \"\"\"\r\n        :type s: str\r\n        :type p: str\r\n        :rtype: bool\r\n        \"\"\"\r\n        # Initialize the dp array with False values\r\n        dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]\r\n        dp[0][0] = True\r\n\r\n        # Fill first row for patterns with \'*\'\r\n        for j in range(1, len(p) + 1):\r\n            if p[j - 1] == \'*\':\r\n                dp[0][j] = dp[0][j - 1]\r\n\r\n        # Fill the dp table\r\n        for i in range(1, len(s) + 1):\r\n            for j in range(1, len(p) + 1):\r\n                if p[j - 1] == \'*\':\r\n                    dp[i][j] = dp[i - 1][j] or dp[i][j - 1]\r\n                elif p[j - 1] == \'?\' or s[i - 1] == p[j - 1]:\r\n                    dp[i][j] = dp[i - 1][j - 1]\r\n\r\n        return dp[len(s)][len(p)]\r\n', 'import Solution\r\n\r\ndef main():\r\n    with open(\'testcase.txt\', \"r\") as f:\r\n        lines = f.readlines()\r\n    \r\n    i = 0\r\n    passall = True\r\n    while i < len(lines):\r\n        s = lines[i].strip()\r\n        p = lines[i + 1].strip()\r\n        expected = lines[i + 2].strip().lower() == \'true\'\r\n\r\n        # Run the solution method\r\n        result = Solution.Solution().isMatch(s, p)\r\n        \r\n        if result != expected:\r\n            print(f\"[Fail] String: {s}, Pattern: {p}, Expected: {expected}, Got: {result}\")\r\n            passall = False\r\n            break\r\n        \r\n        i += 3\r\n\r\n    if passall:\r\n        print(f\"[Success] Your solution passed all {len(lines) // 3} test cases!\")\r\n\r\nif __name__ == \'__main__\':\r\n    main()\r\n', 'class Solution:\r\n    def isMatch(self, s: str, p: str) -> bool:\r\n        ', 'wildcard-matching', 1, 1),
(12, 'Minimum Window Substring', 'string', 'expert', '<p>Given two strings s and t of lengths m and n respectively, return <i>the <strong>minimum window</strong></i></p><p><i><strong>substring</strong></i></p><p><i>of </i>s<i> such that every character in </i>t<i> (<strong>including duplicates</strong>) is included in the window</i>. If there is no such substring, return <i>the empty string </i>\"\".</p><p>&nbsp;</p><p>The testcases will be generated such that the answer is <strong>unique</strong>.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> s = \"ADOBECODEBANC\", t = \"ABC\" <strong>Output:</strong> \"BANC\" <strong>Explanation:</strong> The minimum window substring \"BANC\" includes \'A\', \'B\', and \'C\' from string t.</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> s = \"a\", t = \"a\" <strong>Output:</strong> \"a\" <strong>Explanation:</strong> The entire string s is the minimum window.</p><p><strong>Example 3:</strong></p><p><strong>Input:</strong> s = \"a\", t = \"aa\" <strong>Output:</strong> \"\" <strong>Explanation:</strong> Both \'a\'s from t must be included in the window. Since the largest window of s only has one \'a\', return empty string.</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>m == s.length</li><li>n == t.length</li><li>1 &lt;= m, n &lt;= 105</li><li>s and t consist of uppercase and lowercase English letters.</li></ul><p>&nbsp;</p><p><strong>Follow up:</strong> Could you find an algorithm that runs in O(m + n) time?</p>', 'ADOBECODEBANC\nABC\nBANC\na\naa\n\"\"\nab\na\na\nthisisatest\ntist\ntist\nhello\nllo\nllo', 'class Solution(object):\r\n    def minWindow(self, s, t):\r\n        \"\"\"\r\n        :type s: str\r\n        :type t: str\r\n        :rtype: str\r\n        \"\"\"\r\n        if not s or not t:\r\n            return \"\"\r\n\r\n        # Count characters in t\r\n        t_count = {}\r\n        for char in t:\r\n            t_count[char] = t_count.get(char, 0) + 1\r\n\r\n        # Quick check: if s lacks any character in t\r\n        if any(s.count(char) < t_count[char] for char in t_count):\r\n            return \"\"\r\n\r\n        # Initialize window\r\n        window_count = {}\r\n        have, need = 0, len(t_count)\r\n        res, res_len = [-1, -1], float(\"inf\")\r\n        left = 0\r\n\r\n        # Expand window by moving the right pointer\r\n        for right in range(len(s)):\r\n            char = s[right]\r\n            window_count[char] = window_count.get(char, 0) + 1\r\n\r\n            if char in t_count and window_count[char] == t_count[char]:\r\n                have += 1\r\n\r\n            # Contract the window by moving the left pointer\r\n            while have == need:\r\n                # Update result\r\n                if (right - left + 1) < res_len:\r\n                    res = [left, right]\r\n                    res_len = right - left + 1\r\n\r\n                # Pop the left character from window\r\n                window_count[s[left]] -= 1\r\n                if s[left] in t_count and window_count[s[left]] < t_count[s[left]]:\r\n                    have -= 1\r\n                left += 1\r\n\r\n        left, right = res\r\n        return s[left:right+1] if res_len != float(\"inf\") else \"\"\r\n', 'import Solution\r\n\r\ndef main():\r\n    with open(\'testcase.txt\', \"r\") as f:\r\n        lines = f.readlines()\r\n    \r\n    i = 0\r\n    passall = True\r\n    while i < len(lines):\r\n        s = lines[i].strip()\r\n        t = lines[i + 1].strip()\r\n        expected = lines[i + 2].strip()\r\n\r\n        # Run the solution method\r\n        result = Solution.Solution().minWindow(s, t)\r\n        \r\n        if result != expected:\r\n            print(f\"[Fail] String: {s}, Pattern: {t}, Expected: {expected}, Got: {result}\")\r\n            passall = False\r\n            break\r\n        \r\n        i += 3\r\n\r\n    if passall:\r\n        print(f\"[Success] Your solution passed all {len(lines) // 3} test cases!\")\r\n\r\nif __name__ == \'__main__\':\r\n    main()\r\n', 'class Solution:\r\n    def minWindow(self, s: str, t: str) -> str:\r\n        ', 'minimum-window-substring', 1, NULL),
(13, 'Remove Duplicates from Sorted Array', 'array', 'expert', '<p>Given an integer array nums sorted in <strong>non-decreasing order</strong>, remove the duplicates <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\"><strong>in-place</strong></a> such that each unique element appears only <strong>once</strong>. The <strong>relative order</strong> of the elements should be kept the <strong>same</strong>. Then return <i>the number of unique elements in </i>nums.</p><p>Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:</p><ul><li>Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.</li><li>Return k.</li></ul><p><strong>Custom Judge:</strong></p><p>The judge will test your solution with the following code:</p><p>int[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i &lt; k; i++) {\n &nbsp; &nbsp;assert nums[i] == expectedNums[i];\n}\n</p><p>If all assertions pass, then your solution will be <strong>accepted</strong>.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> nums = [1,1,2]\n<strong>Output:</strong> 2, nums = [1,2,_]\n<strong>Explanation:</strong> Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> nums = [0,0,1,1,1,2,2,3,3,4]\n<strong>Output:</strong> 5, nums = [0,1,2,3,4,_,_,_,_,_]\n<strong>Explanation:</strong> Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>1 &lt;= nums.length &lt;= 3 * 104</li><li>-100 &lt;= nums[i] &lt;= 100</li><li>nums is sorted in <strong>non-decreasing</strong> order.</li></ul><p><br>&nbsp;</p>', '[1,1,2]\n2\n[0,0,1,1,1,2,2,3,3,4]\n5\n[1,2,3,4,5]\n5\n[]\n0\n[1,1,1,1,1,1,1]\n1\n', 'class Solution(object):\r\n    def removeDuplicates(self, nums):\r\n        \"\"\"\r\n        :type nums: List[int]\r\n        :rtype: int\r\n        \"\"\"\r\n        if not nums:\r\n            return 0\r\n\r\n        # Initialize the index for the next unique element\r\n        unique_index = 1\r\n\r\n        for i in range(1, len(nums)):\r\n            if nums[i] != nums[i - 1]:  # Found a new unique element\r\n                nums[unique_index] = nums[i]\r\n                unique_index += 1\r\n\r\n        return unique_index  # Length of unique elements\r\n', 'import json\r\nimport Solution\r\n\r\ndef stringToIntegerList(input):\r\n    return json.loads(input)\r\n\r\ndef main():\r\n    with open(\'testcase.txt\', \"r\") as f:\r\n        lines = f.readlines()\r\n    \r\n    i = 0\r\n    passall = True\r\n    while i < len(lines):\r\n        nums = stringToIntegerList(lines[i].strip())\r\n        expected_length = int(lines[i + 1].strip())\r\n        i += 2\r\n\r\n        # Run the solution method\r\n        result_length = Solution.Solution().removeDuplicates(nums)\r\n\r\n        if result_length != expected_length or nums[:result_length] != sorted(set(nums[:expected_length])):\r\n            print(f\"[Fail] Input: {nums}, Expected Length: {expected_length}, Got Length: {result_length}\")\r\n            passall = False\r\n            break\r\n\r\n    if passall:\r\n        print(f\"[Success] Your solution passed all {len(lines) // 2} test cases!\")\r\n\r\nif __name__ == \'__main__\':\r\n    main()\r\n', 'class Solution:\r\n    def removeDuplicates(self, nums: List[int]) -> int:\r\n        ', 'remove-duplicates-from-sorted-array', 1, NULL),
(14, 'Median of Two Sorted Arrays', 'array', 'expert', '<p>Given two sorted arrays nums1 and nums2 of size m and n respectively, return <strong>the median</strong> of the two sorted arrays.</p><p>The overall run time complexity should be O(log (m+n)).</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Input:</strong> nums1 = [1,3], nums2 = [2]\n<strong>Output:</strong> 2.00000\n<strong>Explanation:</strong> merged array = [1,2,3] and median is 2.\n</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> nums1 = [1,2], nums2 = [3,4]\n<strong>Output:</strong> 2.50000\n<strong>Explanation:</strong> merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>nums1.length == m</li><li>nums2.length == n</li><li>0 &lt;= m &lt;= 1000</li><li>0 &lt;= n &lt;= 1000</li><li>1 &lt;= m + n &lt;= 2000</li><li>-106 &lt;= nums1[i], nums2[i] &lt;= 106</li></ul>', '[1, 3]\n[2]\n2.0\n[1, 2]\n[3, 4]\n2.5\n[0, 0]\n[0, 0]\n0.0\n[]\n[1]\n1.0\n[2]\n[]\n2.0\n', 'class Solution(object):\r\n    def findMedianSortedArrays(self, nums1, nums2):\r\n        \"\"\"\r\n        :type nums1: List[int]\r\n        :type nums2: List[int]\r\n        :rtype: float\r\n        \"\"\"\r\n        # Ensure nums1 is the smaller array\r\n        if len(nums1) > len(nums2):\r\n            nums1, nums2 = nums2, nums1\r\n\r\n        x, y = len(nums1), len(nums2)\r\n        low, high = 0, x\r\n\r\n        while low <= high:\r\n            partitionX = (low + high) // 2\r\n            partitionY = (x + y + 1) // 2 - partitionX\r\n\r\n            maxX = float(\'-inf\') if partitionX == 0 else nums1[partitionX - 1]\r\n            minX = float(\'inf\') if partitionX == x else nums1[partitionX]\r\n\r\n            maxY = float(\'-inf\') if partitionY == 0 else nums2[partitionY - 1]\r\n            minY = float(\'inf\') if partitionY == y else nums2[partitionY]\r\n\r\n            if maxX <= minY and maxY <= minX:\r\n                if (x + y) % 2 == 0:\r\n                    return (max(maxX, maxY) + min(minX, minY)) / 2.0\r\n                else:\r\n                    return float(max(maxX, maxY))\r\n\r\n            elif maxX > minY:\r\n                high = partitionX - 1\r\n            else:\r\n                low = partitionX + 1\r\n\r\n        raise ValueError(\"Input arrays are not sorted.\")\r\n', 'import json\r\nimport Solution\r\n\r\ndef stringToIntegerList(input):\r\n    return json.loads(input)\r\n\r\ndef main():\r\n    with open(\'testcase.txt\', \"r\") as f:\r\n        lines = f.readlines()\r\n    \r\n    i = 0\r\n    passall = True\r\n    while i < len(lines):\r\n        nums1 = stringToIntegerList(lines[i].strip())\r\n        nums2 = stringToIntegerList(lines[i + 1].strip())\r\n        expected_median = float(lines[i + 2].strip())\r\n        i += 3\r\n\r\n        # Run the solution method\r\n        result_median = Solution.Solution().findMedianSortedArrays(nums1, nums2)\r\n\r\n        if result_median != expected_median:\r\n            print(f\"[Fail] Arrays: {nums1} and {nums2}, Expected Median: {expected_median}, Got: {result_median}\")\r\n            passall = False\r\n            break\r\n\r\n    if passall:\r\n        print(f\"[Success] Your solution passed all {len(lines) // 3} test cases!\")\r\n\r\nif __name__ == \'__main__\':\r\n    main()\r\n', 'class Solution:\r\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\r\n        ', 'median-of-two-sorted-arrays', 1, NULL),
(15, 'Merge Two Sorted Lists', 'linked-list', 'intermediate', '<p>You are given the heads of two sorted linked lists list1 and list2.</p><p>Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p><p>Return <i>the head of the merged linked list</i>.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><figure class=\"image\"><img src=\"https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg\" alt=\"\"></figure><p><strong>Input:</strong> list1 = [1,2,4], list2 = [1,3,4] <strong>Output:</strong> [1,1,2,3,4,4]</p><p><strong>Example 2:</strong></p><p><strong>Input:</strong> list1 = [], list2 = [] <strong>Output:</strong> []</p><p><strong>Example 3:</strong></p><p><strong>Input:</strong> list1 = [], list2 = [0] <strong>Output:</strong> [0]</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>The number of nodes in both lists is in the range [0, 50].</li><li>-100 &lt;= Node.val &lt;= 100</li><li>Both list1 and list2 are sorted in <strong>non-decreasing</strong> order.</li></ul>', '[1, 2, 4]\n[1, 3, 4]\n[1, 1, 2, 3, 4, 4]\n[]\n[]\n[]\n[]\n[0]\n[0]\n[2]\n[1]\n[1, 2]', '# Definition for singly-linked list.\r\nclass ListNode:\r\n    def __init__(self, val=0, next=None):\r\n        self.val = val\r\n        self.next = next\r\n\r\nclass Solution:\r\n    def mergeTwoLists(self, list1, list2):\r\n        \"\"\"\r\n        :type list1: ListNode\r\n        :type list2: ListNode\r\n        :rtype: ListNode\r\n        \"\"\"\r\n        dummy = ListNode()  # Start with a dummy node\r\n        tail = dummy  # Tail pointer to build the merged list\r\n\r\n        while list1 and list2:\r\n            if list1.val < list2.val:\r\n                tail.next = list1\r\n                list1 = list1.next\r\n            else:\r\n                tail.next = list2\r\n                list2 = list2.next\r\n            tail = tail.next  # Move tail to the new end of the merged list\r\n\r\n        # Append the remaining nodes\r\n        tail.next = list1 if list1 else list2\r\n\r\n        return dummy.next  # The merged list starts at dummy.next\r\n', 'import json\r\n\r\n# Helper function to convert a Python list to a linked list\r\ndef list_to_linkedlist(lst):\r\n    dummy = ListNode()\r\n    current = dummy\r\n    for value in lst:\r\n        current.next = ListNode(value)\r\n        current = current.next\r\n    return dummy.next\r\n\r\n# Helper function to convert a linked list to a Python list\r\ndef linkedlist_to_list(node):\r\n    result = []\r\n    while node:\r\n        result.append(node.val)\r\n        node = node.next\r\n    return result\r\n\r\ndef stringToIntegerList(input):\r\n    return json.loads(input)\r\n\r\ndef main():\r\n    with open(\'testcase.txt\', \"r\") as f:\r\n        lines = f.readlines()\r\n    \r\n    i = 0\r\n    passall = True\r\n    while i < len(lines):\r\n        list1 = stringToIntegerList(lines[i].strip())\r\n        list2 = stringToIntegerList(lines[i + 1].strip())\r\n        expected = stringToIntegerList(lines[i + 2].strip())\r\n        i += 3\r\n\r\n        # Convert input lists to linked lists\r\n        list1_node = list_to_linkedlist(list1)\r\n        list2_node = list_to_linkedlist(list2)\r\n\r\n        # Run the solution method\r\n        result_node = Solution().mergeTwoLists(list1_node, list2_node)\r\n\r\n        # Convert the result linked list to a list for easy comparison\r\n        result_list = linkedlist_to_list(result_node)\r\n\r\n        if result_list != expected:\r\n            print(f\"[Fail] Lists: {list1} and {list2}, Expected: {expected}, Got: {result_list}\")\r\n            passall = False\r\n            break\r\n\r\n    if passall:\r\n        print(f\"[Success] Your solution passed all {len(lines) // 3} test cases!\")\r\n\r\nif __name__ == \'__main__\':\r\n    main()\r\n', '# Definition for singly-linked list.\r\n# class ListNode:\r\n#     def __init__(self, val=0, next=None):\r\n#         self.val = val\r\n#         self.next = next\r\nclass Solution:\r\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\r\n        ', 'merge-two-sorted-lists', 1, NULL),
(16, 'Rotate List', 'linked-list', 'intermediate', '<p>Given the head of a linked&nbsp;list, rotate the list to the right by k places.</p><p>&nbsp;</p><p><strong>Example 1:</strong></p><figure class=\"image\"><img src=\"https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg\" alt=\"\"></figure><p><strong>Input:</strong> head = [1,2,3,4,5], k = 2\n<strong>Output:</strong> [4,5,1,2,3]\n</p><p><strong>Example 2:</strong></p><figure class=\"image\"><img src=\"https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg\" alt=\"\"></figure><p><strong>Input:</strong> head = [0,1,2], k = 4\n<strong>Output:</strong> [2,0,1]\n</p><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the list is in the range [0, 500].</li><li>-100 &lt;= Node.val &lt;= 100</li><li>0 &lt;= k &lt;= 2 * 109</li></ul>', '[1, 2, 3, 4, 5]\n2\n[4, 5, 1, 2, 3]\n[0, 1, 2]\n4\n[2, 0, 1]\n[]\n1\n[]\n[1, 2]\n0\n[1, 2]\n[1, 2]\n1\n[2, 1]\n', '# Definition for singly-linked list.\r\nclass ListNode:\r\n    def __init__(self, val=0, next=None):\r\n        self.val = val\r\n        self.next = next\r\n\r\nclass Solution:\r\n    def rotateRight(self, head, k):\r\n        \"\"\"\r\n        :type head: ListNode\r\n        :type k: int\r\n        :rtype: ListNode\r\n        \"\"\"\r\n        if not head or not head.next or k == 0:\r\n            return head\r\n\r\n        # First, determine the length of the list\r\n        length = 1\r\n        tail = head\r\n        while tail.next:\r\n            tail = tail.next\r\n            length += 1\r\n\r\n        # Connect the tail to the head to form a circle\r\n        tail.next = head\r\n\r\n        # Calculate the effective rotations needed\r\n        k = k % length\r\n        steps_to_new_head = length - k\r\n\r\n        # Find the new head and tail\r\n        new_tail = head\r\n        for _ in range(steps_to_new_head - 1):\r\n            new_tail = new_tail.next\r\n\r\n        new_head = new_tail.next\r\n        new_tail.next = None  # Break the circle\r\n\r\n        return new_head\r\n', 'import json\r\n\r\n# Helper function to convert a list to a linked list\r\ndef list_to_linkedlist(lst):\r\n    dummy = ListNode()\r\n    current = dummy\r\n    for value in lst:\r\n        current.next = ListNode(value)\r\n        current = current.next\r\n    return dummy.next\r\n\r\n# Helper function to convert a linked list to a list\r\ndef linkedlist_to_list(node):\r\n    result = []\r\n    while node:\r\n        result.append(node.val)\r\n        node = node.next\r\n    return result\r\n\r\ndef stringToIntegerList(input):\r\n    return json.loads(input)\r\n\r\ndef main():\r\n    with open(\'testcase.txt\', \"r\") as f:\r\n        lines = f.readlines()\r\n    \r\n    i = 0\r\n    passall = True\r\n    while i < len(lines):\r\n        input_list = stringToIntegerList(lines[i].strip())\r\n        k = int(lines[i + 1].strip())\r\n        expected = stringToIntegerList(lines[i + 2].strip())\r\n        i += 3\r\n\r\n        # Convert input list to a linked list\r\n        head = list_to_linkedlist(input_list)\r\n\r\n        # Run the solution method\r\n        result_head = Solution().rotateRight(head, k)\r\n\r\n        # Convert the result linked list to a list for easy comparison\r\n        result_list = linkedlist_to_list(result_head)\r\n\r\n        if result_list != expected:\r\n            print(f\"[Fail] List: {input_list}, Rotate by: {k}, Expected: {expected}, Got: {result_list}\")\r\n            passall = False\r\n            break\r\n\r\n    if passall:\r\n        print(f\"[Success] Your solution passed all {len(lines) // 3} test cases!\")\r\n\r\nif __name__ == \'__main__\':\r\n    main()\r\n', '# Definition for singly-linked list.\r\n# class ListNode:\r\n#     def __init__(self, val=0, next=None):\r\n#         self.val = val\r\n#         self.next = next\r\nclass Solution:\r\n    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\r\n        ', 'rotate-list', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contest`
--

CREATE TABLE `contest` (
  `id` int NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` datetime(3) NOT NULL,
  `end_time` datetime(3) NOT NULL,
  `status` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `problems` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contest`
--

INSERT INTO `contest` (`id`, `title`, `slug`, `access_code`, `start_time`, `end_time`, `status`, `created_at`, `problems`) VALUES
(3, 'BUBTContest', 'bubt -contest', '12345', '2024-11-07 01:30:00.000', '2024-11-07 04:00:00.000', 1, '2024-11-06 17:59:04.811', '[{\"label\": \"Longest Common Prefix\", \"value\": 1}, {\"label\": \"Reverse String\", \"value\": 2}, {\"label\": \"Search Insert Position\", \"value\": 3}, {\"label\": \"Single Number\", \"value\": 4}, {\"label\": \"Two Sum\", \"value\": 7}]');

-- --------------------------------------------------------

--
-- Table structure for table `contest_submissions`
--

CREATE TABLE `contest_submissions` (
  `id` int NOT NULL,
  `contest_id` int NOT NULL,
  `question_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `run_time` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_by` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `course_category_id` int NOT NULL,
  `short_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructor_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_categories`
--

CREATE TABLE `course_categories` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `course_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_contents`
--

CREATE TABLE `course_contents` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `content_category_id` int NOT NULL,
  `content_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_content_categories`
--

CREATE TABLE `course_content_categories` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `content_category_title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_learn`
--

CREATE TABLE `course_learn` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_progress`
--

CREATE TABLE `course_progress` (
  `id` int NOT NULL,
  `subscribed_course_id` int NOT NULL,
  `course_content_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_questions`
--

CREATE TABLE `course_questions` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `content_category_id` int NOT NULL,
  `question` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `choice_one` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `choice_two` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `choice_three` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `choice_four` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `correct_choice` json NOT NULL,
  `is_multi` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructor`
--

CREATE TABLE `instructor` (
  `id` int NOT NULL,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `image` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `participator_progress`
--

CREATE TABLE `participator_progress` (
  `id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `user_id` int NOT NULL,
  `question_id` int NOT NULL,
  `is_correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int NOT NULL,
  `quiz_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `marks` decimal(10,0) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_participators`
--

CREATE TABLE `quiz_participators` (
  `id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_obtained_marks` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int NOT NULL,
  `quiz_id` int NOT NULL,
  `question_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referral_token`
--

CREATE TABLE `referral_token` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `image`, `created_at`) VALUES
(5, '/assets/slider/businessman-his-office-making-ok-sign-removebg-preview.png', '2024-11-06 18:23:43.121');

-- --------------------------------------------------------

--
-- Table structure for table `study_plan`
--

CREATE TABLE `study_plan` (
  `id` int NOT NULL,
  `start_date` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `user_id` int NOT NULL,
  `color` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int NOT NULL,
  `question_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `run_time` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `question_id`, `user_id`, `status`, `language`, `created_at`, `run_time`) VALUES
(2, 3, 1, 'pass', 'python', '2024-07-02 18:03:47.458', '91'),
(3, 4, 1, 'pass', 'python', '2024-06-18 18:05:03.497', '54'),
(4, 5, 1, 'pass', 'python', '2024-11-03 18:06:05.438', '94'),
(5, 1, 1, 'pass', 'python', '2024-11-06 18:13:40.259', '92'),
(6, 1, 1, 'pass', 'python', '2024-11-06 18:17:30.816', '91'),
(7, 1, 1, 'fail', 'python', '2024-11-04 18:17:54.987', '96'),
(8, 11, 1, 'pass', 'python', '2024-11-07 05:28:40.787', '95'),
(9, 12, 1, 'fail', 'python', '2024-11-07 05:31:21.864', '84'),
(10, 12, 1, 'fail', 'python', '2024-08-05 05:32:01.306', '85'),
(11, 12, 1, 'fail', 'python', '2024-11-07 05:33:44.660', '87'),
(12, 13, 1, 'pass', 'python', '2024-10-09 05:42:11.240', '95'),
(13, 14, 1, 'pass', 'python', '2024-11-07 05:48:04.315', '97'),
(14, 2, 1, 'pass', 'python', '2024-11-07 06:07:31.431', '113');

-- --------------------------------------------------------

--
-- Table structure for table `subscribed_courses`
--

CREATE TABLE `subscribed_courses` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `subscribed_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refered_by` int NOT NULL,
  `remaining_points` int NOT NULL,
  `totp_secret` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `referral_code` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `refered_by`, `remaining_points`, `totp_secret`, `last_login`, `created_at`, `updated_at`, `referral_code`) VALUES
(1, 'Ridoy', 'Sarker', 'csridoy42@gmail.com', '$2a$10$YTFqNAQu6D38DzzqIVN0u.8XHhozZwJV0ToKvMdPYdGvJ37tQkHAi', 1, 3000, '', '', '2024-05-14 18:42:03.838', '2024-11-05 17:32:03.196', '6ee96e83c6ef6533e93bf677f131d184'),
(2, 'Tanvir ', 'Hossen', 'tanvirhossen112@gmail.com', '$2a$10$BUNBe.JuDWl/L2sXJRBKUuGWJr2WctI/MKcondn4SDIeQ2786YeIq', 1, 3000, '', '', '2024-11-06 03:15:45.172', '2024-11-06 03:15:45.172', 'b3f468ee99627bdb53494e5b438cc10f');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('00e20260-edad-42a2-819c-a48f1085f2dc', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:38.614', '20230710161516_', NULL, NULL, '2024-08-15 15:37:38.470', 1),
('01fbd600-716f-41fd-b068-64ed3138264f', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:57.597', '20240520174115_', NULL, NULL, '2024-08-15 15:37:57.446', 1),
('03c33e07-0034-4729-ba0e-909eff535f38', 'b1dfb3550509b14d8c3853a5b292561fd4a7c59daab00a5fecbed0c98e788d60', '2024-08-15 15:37:43.392', '20230902093233_', NULL, NULL, '2024-08-15 15:37:43.193', 1),
('0732d88c-8d59-48cf-b620-be67c687f2bc', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:58.295', '20240701154102_add_default', NULL, NULL, '2024-08-15 15:37:58.172', 1),
('0f1b4714-143c-4fc9-9e1c-4c12c699d9ac', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:50.797', '20230905181111_change_instructor', NULL, NULL, '2024-08-15 15:37:50.651', 1),
('10d73d7a-ba66-4e75-b801-4b5bfe63cd1d', 'ad9ecf68167ba7971360cfbd020cfd3b6f538673aacdbb411b68a5746f5bac19', '2024-08-15 15:37:52.039', '20230906073538_', NULL, NULL, '2024-08-15 15:37:51.544', 1),
('1c502ccd-e22e-4bc3-96e0-c3db132938ad', '43d629aafbd8db5fa9b0b66982aefc49425e26fdc2f0b7dff9238e00c905e898', '2024-08-15 15:37:39.372', '20230719170715_', NULL, NULL, '2024-08-15 15:37:39.086', 1),
('2053168b-f113-4d88-a98d-7e5345aa2abf', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:50.631', '20230905153348_', NULL, NULL, '2024-08-15 15:37:50.468', 1),
('25859269-64a0-4a91-925e-c1fe5b076f1f', 'd51160b0b8f8fc05550b7ad37a15ccbb835c48618cfb3da3511c310316bb5d40', '2024-08-15 15:37:47.524', '20230904121048_', NULL, NULL, '2024-08-15 15:37:46.657', 1),
('25dd40dc-61a8-43e1-84ea-1742bdc87068', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:53.211', '20230907072137_', NULL, NULL, '2024-08-15 15:37:53.022', 1),
('2c59d3ce-949b-4d9d-b8b3-766e71de68bf', 'b50121a6a36e982aca3d622fb2e7428f3e5f34ac10b68f2394322eab37eb9223', '2024-08-15 15:37:43.176', '20230902091817_study_plan', NULL, NULL, '2024-08-15 15:37:42.858', 1),
('30428314-555a-46a3-a992-46dccdbe4c18', '08b80d32bdd21636b60f996a8273f84d443172440efda1da9e1910501da7a0f4', '2024-08-15 15:37:43.750', '20230902140337_', NULL, NULL, '2024-08-15 15:37:43.540', 1),
('31ec2f0d-6fe0-4d76-89f0-10b10bc5a40d', 'f7c8dbfc06185e6ac1122717fd1ccbf8388fa303c848578f7badf4c09364f1b8', '2024-08-15 15:37:55.519', '20240514183721_', NULL, NULL, '2024-08-15 15:37:54.481', 1),
('33cf3377-a602-4c52-bb94-170641a25697', '6a7997d7deccbc10682e41da3f5a6e5696e5a8befae5b93b5a9d13382fa938d4', '2024-08-15 15:37:24.772', '20230402164743_change_admin_users', NULL, NULL, '2024-08-15 15:37:24.476', 1),
('3c357f96-f8a8-476b-a29d-1c613e779df4', '2fa34dd8b2343a57511ee8608942def059883c8e7b265a40fec507701ae1e820', '2024-08-15 15:37:41.824', '20230901081815_referal_code', NULL, NULL, '2024-08-15 15:37:41.386', 1),
('3efc44aa-5897-4091-b4fd-1c9489c45ace', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:53.371', '20230913191216_', NULL, NULL, '2024-08-15 15:37:53.230', 1),
('3fcf719a-cda8-49ee-8264-1e14acdf77e1', '5d8f21b8022e0db7bc7001523a906a91ccef5bd7156fb010293efffecaa0c47a', '2024-08-15 15:37:38.439', '20230710161422_', NULL, NULL, '2024-08-15 15:37:37.646', 1),
('4102247c-31d6-4b6d-895b-afd805068fb4', 'e28ac55e2f3b8a73b15835d3841a45cb10a410836b3115ffa773d4589da88ec4', '2024-08-15 15:37:45.745', '20230904065419_', NULL, NULL, '2024-08-15 15:37:44.355', 1),
('43f7061c-5fdf-42dc-9d88-3dc7ceddd43f', 'bacf0f4c7f9b4f41dfab17f6e56fd9812c055b70e7fdc09743cb3e4b4011b63e', '2024-08-15 15:37:54.462', '20240514183506_', NULL, NULL, '2024-08-15 15:37:53.742', 1),
('49daf533-4412-43a2-8298-efb2c917621a', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:53.723', '20240514163253_', NULL, NULL, '2024-08-15 15:37:53.566', 1),
('4c4d98ee-7b1a-4ab2-be6d-0fdc3f33f3f3', 'e58ab0b845b931920c01817ac814ad8d8e7b25b203297a827d7b56364bf00414', '2024-08-15 15:37:57.427', '20240514192936_change_user_id_column', NULL, NULL, '2024-08-15 15:37:56.492', 1),
('4d52dae6-d71b-462d-a0c0-742dd3c625d3', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:52.987', '20230907072117_', NULL, NULL, '2024-08-15 15:37:52.845', 1),
('4d605c58-d0cf-44f4-9ab4-429534447146', 'fcc03ceb483c7417fa6faee2d68618d432407c99b0686a2315a7a5126ca7c881', '2024-08-15 15:37:56.473', '20240514192710_change_user_id_column', NULL, NULL, '2024-08-15 15:37:55.539', 1),
('54182b70-7ef6-406f-aae0-725f26c8c728', '8c0d5d01ea9692e8ed5cff4c20e9b915bf5c12371b2ca20145f6a01075aacc67', '2024-08-15 15:37:38.878', '20230710164129_change_courses_table', NULL, NULL, '2024-08-15 15:37:38.632', 1),
('547d84fc-2f44-4c42-a55a-ac06c24c6d2a', '032bf7c902f5fbfe931d9bb37b9ca1f61ef7bd71e07693c2aad747c948e785b0', '2024-08-15 15:37:41.367', '20230901081600_referral_code', NULL, NULL, '2024-08-15 15:37:41.084', 1),
('560a9f43-5c57-4775-955f-33bb2f4b8721', 'b817e66d172b2c0eb1b3cbdc033c698a286ebc7d4aa13ff83e0b96281ae5d5da', '2024-08-15 15:37:23.879', '20230326112614_create_course_related_tables', NULL, NULL, '2024-08-15 15:37:20.615', 1),
('57f91938-6c32-4ee4-b91d-59b1e1df41eb', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:47.997', '20230904175012_5_sep_2023', NULL, NULL, '2024-08-15 15:37:47.874', 1),
('6675b2a2-6172-4b06-815b-4336bbf14d5f', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:50.439', '20230905081550_', NULL, NULL, '2024-08-15 15:37:50.304', 1),
('66f283d7-a627-4219-a0fc-7f4d1b8e34f5', 'ad70a6ab5e2af295d2f3493e106fd9bb69526e8b30525b781ebd786730a8e5ea', '2024-08-15 15:37:24.453', '20230326112956_create_course_related_tables', NULL, NULL, '2024-08-15 15:37:23.896', 1),
('672236d7-3fa7-4cce-b63c-cc0ab8e83c9c', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:37.619', '20230530170832_dev', NULL, NULL, '2024-08-15 15:37:37.503', 1),
('6accc915-2561-4773-afdb-4602a6d67f94', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:41.044', '20230830191631_', NULL, NULL, '2024-08-15 15:37:40.875', 1),
('6ba4b86d-f3cd-433c-a4e8-636ff7b2f42a', '30220c8454c070b2dae423f386f47d2a9cc5edf298922b1319052b9c033cfb06', '2024-08-15 15:37:39.913', '20230719174423_', NULL, NULL, '2024-08-15 15:37:39.390', 1),
('7296a413-9b71-4259-a02a-3d9a880b8827', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:58.738', '20240705152749_remove_problems', NULL, NULL, '2024-08-15 15:37:58.585', 1),
('7d34f72c-4899-442b-ba4e-66a45bd7caf6', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:43.523', '20230902093330_new_field_add_in_study_plan', NULL, NULL, '2024-08-15 15:37:43.410', 1),
('7d4efdc9-0384-4626-9218-ac647e31db8e', 'b47457ea7d6d6e05f112ad0e75bab2885cc83ba17945d26c514842642a7a90c1', '2024-08-15 15:37:46.496', '20230904074821_add_column_in_coding_challenges', NULL, NULL, '2024-08-15 15:37:46.266', 1),
('7ee7525d-8ae8-4e37-ab6a-587d6127e7f6', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:47.849', '20230904140728_', NULL, NULL, '2024-08-15 15:37:47.712', 1),
('7ee9bd3a-b91c-414d-9635-d1ab5451debf', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:46.240', '20230904074308_', NULL, NULL, '2024-08-15 15:37:46.082', 1),
('822f94c0-3c8c-4617-ad5c-bae965466076', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:46.631', '20230904074906_', NULL, NULL, '2024-08-15 15:37:46.514', 1),
('82888f70-0127-41ab-b514-7e574d1d831c', 'a26f8e527a21879ad4ae3b51ee09f40f1679125cd7177207c5b15e8e04280175', '2024-08-15 15:37:46.047', '20230904073021_coding_challenges', NULL, NULL, '2024-08-15 15:37:45.763', 1),
('869910e1-d1a1-4956-8d68-c3d4c8aa9682', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:42.574', '20230901093909_change_course_content_table', NULL, NULL, '2024-08-15 15:37:42.418', 1),
('8b54178a-6e4d-4a69-8c71-e8adc31f2a80', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:50.284', '20230905081543_', NULL, NULL, '2024-08-15 15:37:50.161', 1),
('8b83bb5a-4031-4ec8-9a9c-5023ac225b87', 'a2d7ec5695874cc21af7fd74acd733932b954a50a4914a24eb9a07f6c30c9966', '2024-08-15 15:37:24.923', '20230412180256_alter_course_category_table', NULL, NULL, '2024-08-15 15:37:24.789', 1),
('8e3d5611-9880-4d25-b6bc-ae64fc9bad5d', '4cb5574a7001208335eeba8905d5ad1420185a3d6d57e7f03b59feefec385b6c', '2024-08-15 15:37:58.152', '20240701153927_init', NULL, NULL, '2024-08-15 15:37:57.795', 1),
('8f68c294-0130-428b-90fc-e2110fcd24ed', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:49.571', '20230905035739_6_sep_2023', NULL, NULL, '2024-08-15 15:37:49.457', 1),
('936b1a1a-9f4b-40a2-9b10-3f98a52feec0', '99b84fcce5758132c7d5df8fa2f10783b56c763fb4b324a82e43d9a1e69594c6', '2024-08-15 15:37:30.614', '20230501082902_add_user_table_subscribed_table_course_progress_table_quiz_table_quiz_question_table_quiz_participator_table_participator_progess_table', NULL, NULL, '2024-08-15 15:37:24.941', 1),
('98b2cd9a-f929-4ac1-afe1-d0fbd3a67395', 'e4324070f24ca0139c6bea31d466d9877e1bd1e6d1c86ed194d6047905db17a7', '2024-08-15 15:37:42.838', '20230901094156_change_course_image_table', NULL, NULL, '2024-08-15 15:37:42.593', 1),
('9bdb3020-9143-4a45-a52a-556ce7f9e218', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:49.717', '20230905062806_', NULL, NULL, '2024-08-15 15:37:49.591', 1),
('9f1f4f99-92d5-4d77-a941-1cbc8114a120', 'ba6aa6f14158ae3148e59039d41fa40d3f09d8bebe4eb0f06787c2816ba7d596', '2024-08-15 15:37:49.177', '20230904180243_create_submissions_table', NULL, NULL, '2024-08-15 15:37:48.042', 1),
('a445ff97-3e9d-4187-84f3-ced2c3030d85', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:51.526', '20230906072644_', NULL, NULL, '2024-08-15 15:37:51.404', 1),
('a450f477-9d33-449d-9847-e9a7fe6d8304', 'a93629a85f5a516e5a440fd0bc42c0bde5a0679b89f679476047c768f99f7092', '2024-08-15 15:37:52.826', '20230907071909_', NULL, NULL, '2024-08-15 15:37:52.298', 1),
('ab493d5d-6019-4592-a2ed-1c723ec0e14e', '0a16b062c3c52abcfcc70161264fe5dc0c569c013f13eaa5dd16e6917c1684d8', '2024-08-15 15:37:40.854', '20230830191609_change_category_image_field', NULL, NULL, '2024-08-15 15:37:40.598', 1),
('ac562eed-4d35-4311-ac5c-a505c0659e23', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:53.541', '20240205153929_', NULL, NULL, '2024-08-15 15:37:53.391', 1),
('b1689464-8671-4992-915c-5592bf950365', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:47.690', '20230904121102_', NULL, NULL, '2024-08-15 15:37:47.543', 1),
('b544802e-f5a8-490f-b7e7-35b58e2d31a3', '05568814c4b9ff908401902392dee51ce0b255a45bc88df9675e2452ca044a5a', '2024-08-15 15:37:40.576', '20230828184809_course_category_change', NULL, NULL, '2024-08-15 15:37:40.358', 1),
('b5805754-8562-4102-bd24-df103e9af2ae', '875bcf52493e99e3fa20f3848cfa078ba1b8e180a0c15bd83075c13388f5c97e', '2024-08-15 15:37:49.432', '20230904193547_change_column_in_submissions_table', NULL, NULL, '2024-08-15 15:37:49.194', 1),
('be6fb07a-6ba8-4301-b04b-068df9f76bdf', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:44.329', '20230904063532_4_sep_2023', NULL, NULL, '2024-08-15 15:37:44.204', 1),
('bf09181a-90f4-47da-bf09-b3f2bf8872b9', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:43.926', '20230902140402_color_add_in_study_plan', NULL, NULL, '2024-08-15 15:37:43.771', 1),
('bf83be9e-aaa8-45eb-b892-e5e1bbb282a4', '755ea32a8bababa209547c69a8847d5b500db14a760c66566766e9520176ff2c', '2024-08-15 15:37:50.142', '20230905081529_', NULL, NULL, '2024-08-15 15:37:49.737', 1),
('bfda9dd7-1b03-47b2-af1f-1f780fdc38e1', 'd08a47b7f67e1da4689cc52777011ae13a1829b115ceec8888f485e1fd68bb16', '2024-08-15 15:37:37.264', '20230502174659_alter_table', NULL, NULL, '2024-08-15 15:37:30.633', 1),
('c2821d9e-4e57-4ff6-b5bc-7289b47f043a', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:40.317', '20230721131717_', NULL, NULL, '2024-08-15 15:37:40.176', 1),
('c773555f-255d-4d86-bd27-bec9fb8f7b0c', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:42.398', '20230901093750_change_content_course_image', NULL, NULL, '2024-08-15 15:37:42.257', 1),
('d46e6d1d-b693-4d6c-8cbc-063de1ce28d3', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:57.776', '20240609063532_', NULL, NULL, '2024-08-15 15:37:57.624', 1),
('d669168f-cc01-4dc8-9c24-68958e09f14e', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:39.050', '20230710164143_', NULL, NULL, '2024-08-15 15:37:38.901', 1),
('d8f79190-7ad8-43ab-8076-5e0f23949bcd', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:58.904', '20240705152827_remove_problems_column', NULL, NULL, '2024-08-15 15:37:58.759', 1),
('da221824-10b0-4cf8-b72e-8c79d63f802e', '1b6dfa8809caf587e1012b48317d01da38f89a51b4495becf8f1cf7d16780a7a', '2024-08-15 15:37:37.485', '20230502175802_', NULL, NULL, '2024-08-15 15:37:37.281', 1),
('dbdb9d49-ea57-4cb4-9230-76fcf6a4a884', '2afb96a0b19dc04442c62aa595eeb83e746106499a7011a76049d811778fba0b', '2024-08-15 15:37:42.225', '20230901092223_change_course_content_image', NULL, NULL, '2024-08-15 15:37:41.849', 1),
('debb41f6-13dd-4dde-aceb-7d4528839212', '22dd99bcb129564487f9c979ff13aaef5403a52eaee46bba957c71869861ce89', '2024-08-15 15:37:51.387', '20230906072306_', NULL, NULL, '2024-08-15 15:37:50.980', 1),
('e210c759-2246-41dc-86b5-e524bdb26203', '189701332b9690d100ca8959850bec277806f33954a05a8ad104888b771e7189', '2024-08-15 15:37:20.580', '20230326110911_add_last_login_column_in_admin_users_table', NULL, NULL, '2024-08-15 15:37:20.441', 1),
('e3ae5f26-e17a-484e-b833-2c8e4a887ffa', '0c953385ddd87487e9eed9fd7b096d0518dd438fd023ab41329cbc1ac35f613e', '2024-08-15 15:37:20.423', '20230326110151_create_admin_users_table', NULL, NULL, '2024-08-15 15:37:20.235', 1),
('e67ff38e-3790-481e-9f09-58677b771517', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:39:27.678', '20240815153927_', NULL, NULL, '2024-08-15 15:39:27.562', 1),
('f0dae010-21ff-4798-9591-b2f400129562', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:50.960', '20230905193149_', NULL, NULL, '2024-08-15 15:37:50.816', 1),
('f37a2aa1-02b8-47ee-b8f1-ab72bb5c8291', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:40.118', '20230719175733_', NULL, NULL, '2024-08-15 15:37:39.931', 1),
('f5311c37-2df1-438c-973c-6f2f5f3c7e40', 'b5f7a7ac2dc722947e37dda47ecd58b94e38fb42bc9f0a7c8f7f680280577efa', '2024-08-15 15:37:58.554', '20240705152543_drop_published_column', NULL, NULL, '2024-08-15 15:37:58.313', 1),
('f7aa1a21-8ca6-4d15-bfe4-df9d4d0a557d', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:44.186', '20230902210247_', NULL, NULL, '2024-08-15 15:37:43.954', 1),
('fcb9a566-f70e-4e14-8e3f-46c46bd52673', '5241db857dc86857f19d369f63d5ef8053042639f6c2e2178e7be34029edeaed', '2024-08-15 15:37:52.270', '20230907034831_', NULL, NULL, '2024-08-15 15:37:52.081', 1),
('fedee734-3363-461b-b826-bc463cdf5632', 'ba20d564a098c6cb67defcad662f53803a87315bc55199de653048e1286606f8', '2024-11-03 15:31:39.357', '20241103153139_add_contest_submissions_table', NULL, NULL, '2024-11-03 15:31:39.322', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_users_email_key` (`email`);

--
-- Indexes for table `coding_challenges`
--
ALTER TABLE `coding_challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coding_challenges_user_id_fkey` (`user_id`);

--
-- Indexes for table `contest`
--
ALTER TABLE `contest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contest_submissions`
--
ALTER TABLE `contest_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contest_submissions_user_id_fkey` (`user_id`),
  ADD KEY `contest_submissions_question_id_fkey` (`question_id`),
  ADD KEY `contest_submissions_contest_id_fkey` (`contest_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_created_by_fkey` (`created_by`),
  ADD KEY `courses_course_category_id_fkey` (`course_category_id`),
  ADD KEY `courses_instructor_id_fkey` (`instructor_id`);

--
-- Indexes for table `course_categories`
--
ALTER TABLE `course_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_contents`
--
ALTER TABLE `course_contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_contents_course_id_fkey` (`course_id`),
  ADD KEY `course_contents_content_category_id_fkey` (`content_category_id`);

--
-- Indexes for table `course_content_categories`
--
ALTER TABLE `course_content_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_content_categories_course_id_fkey` (`course_id`);

--
-- Indexes for table `course_learn`
--
ALTER TABLE `course_learn`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_learn_course_id_fkey` (`course_id`);

--
-- Indexes for table `course_progress`
--
ALTER TABLE `course_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_progress_subscribed_course_id_fkey` (`subscribed_course_id`),
  ADD KEY `course_progress_course_content_id_fkey` (`course_content_id`);

--
-- Indexes for table `course_questions`
--
ALTER TABLE `course_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_questions_course_id_fkey` (`course_id`),
  ADD KEY `course_questions_content_category_id_fkey` (`content_category_id`);

--
-- Indexes for table `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participator_progress`
--
ALTER TABLE `participator_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `participator_progress_quiz_id_fkey` (`quiz_id`),
  ADD KEY `participator_progress_user_id_fkey` (`user_id`),
  ADD KEY `participator_progress_question_id_fkey` (`question_id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_participators`
--
ALTER TABLE `quiz_participators`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_participators_quiz_id_fkey` (`quiz_id`),
  ADD KEY `quiz_participators_user_id_fkey` (`user_id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_questions_quiz_id_fkey` (`quiz_id`),
  ADD KEY `quiz_questions_question_id_fkey` (`question_id`);

--
-- Indexes for table `referral_token`
--
ALTER TABLE `referral_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `referral_token_user_id_fkey` (`user_id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `study_plan`
--
ALTER TABLE `study_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submissions_user_id_fkey` (`user_id`),
  ADD KEY `submissions_question_id_fkey` (`question_id`);

--
-- Indexes for table `subscribed_courses`
--
ALTER TABLE `subscribed_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscribed_courses_user_id_fkey` (`user_id`),
  ADD KEY `subscribed_courses_course_id_fkey` (`course_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `coding_challenges`
--
ALTER TABLE `coding_challenges`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `contest`
--
ALTER TABLE `contest`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contest_submissions`
--
ALTER TABLE `contest_submissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_categories`
--
ALTER TABLE `course_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_contents`
--
ALTER TABLE `course_contents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_content_categories`
--
ALTER TABLE `course_content_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_learn`
--
ALTER TABLE `course_learn`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_progress`
--
ALTER TABLE `course_progress`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course_questions`
--
ALTER TABLE `course_questions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instructor`
--
ALTER TABLE `instructor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participator_progress`
--
ALTER TABLE `participator_progress`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_participators`
--
ALTER TABLE `quiz_participators`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referral_token`
--
ALTER TABLE `referral_token`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `study_plan`
--
ALTER TABLE `study_plan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `subscribed_courses`
--
ALTER TABLE `subscribed_courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coding_challenges`
--
ALTER TABLE `coding_challenges`
  ADD CONSTRAINT `coding_challenges_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `contest_submissions`
--
ALTER TABLE `contest_submissions`
  ADD CONSTRAINT `contest_submissions_contest_id_fkey` FOREIGN KEY (`contest_id`) REFERENCES `contest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `contest_submissions_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `coding_challenges` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `contest_submissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_course_category_id_fkey` FOREIGN KEY (`course_category_id`) REFERENCES `course_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `admin_users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `course_contents`
--
ALTER TABLE `course_contents`
  ADD CONSTRAINT `course_contents_content_category_id_fkey` FOREIGN KEY (`content_category_id`) REFERENCES `course_content_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `course_contents_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `course_content_categories`
--
ALTER TABLE `course_content_categories`
  ADD CONSTRAINT `course_content_categories_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `course_learn`
--
ALTER TABLE `course_learn`
  ADD CONSTRAINT `course_learn_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `course_progress`
--
ALTER TABLE `course_progress`
  ADD CONSTRAINT `course_progress_course_content_id_fkey` FOREIGN KEY (`course_content_id`) REFERENCES `course_contents` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `course_progress_subscribed_course_id_fkey` FOREIGN KEY (`subscribed_course_id`) REFERENCES `subscribed_courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `course_questions`
--
ALTER TABLE `course_questions`
  ADD CONSTRAINT `course_questions_content_category_id_fkey` FOREIGN KEY (`content_category_id`) REFERENCES `course_content_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `course_questions_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `participator_progress`
--
ALTER TABLE `participator_progress`
  ADD CONSTRAINT `participator_progress_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `course_questions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `participator_progress_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `participator_progress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `quiz_participators`
--
ALTER TABLE `quiz_participators`
  ADD CONSTRAINT `quiz_participators_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_participators_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `quiz_questions_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `course_questions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_questions_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `referral_token`
--
ALTER TABLE `referral_token`
  ADD CONSTRAINT `referral_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `coding_challenges` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `submissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `subscribed_courses`
--
ALTER TABLE `subscribed_courses`
  ADD CONSTRAINT `subscribed_courses_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `subscribed_courses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
