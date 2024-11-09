def is_match(s: str, p: str) -> bool:
    # Initialize a DP table with False values
    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
    
    # Empty string matches with empty pattern
    dp[0][0] = True
    
    # Fill in table for patterns with leading '*'
    for j in range(1, len(p) + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 1]
    
    # Fill DP table based on pattern and string characters
    for i in range(1, len(s) + 1):
        for j in range(1, len(p) + 1):
            if p[j - 1] == '*':
                # '*' can match zero characters (dp[i][j-1]) or at least one character (dp[i-1][j])
                dp[i][j] = dp[i][j - 1] or dp[i - 1][j]
            elif p[j - 1] == '?' or p[j - 1] == s[i - 1]:
                # '?' matches any single character or exact character match
                dp[i][j] = dp[i - 1][j - 1]
    
    return dp[len(s)][len(p)]
