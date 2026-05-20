---
title: "2017 TGDF Notes: Game AI and Level Difficulty"
originalTitle: "2017 TGDF 筆記 – 遊戲人工智慧與關卡難易度"
description: "TGDF notes on game AI, difficulty curves, evaluation methods, and how designers can think about player challenge."
pubDate: "2017-07-24T16:00:33"
modDate: "2018-08-31T11:44:44"
legacyPath: "/blog/2017/07/24/2017-tgdf-筆記-遊戲人工智慧與關卡難易度"
legacySlug: "2017-tgdf-筆記-遊戲人工智慧與關卡難易度"
wpId: "1211"
legacyAliases:
  - "/blog/1211/"
  - "/blog/1211/conference/"
  - "/blog/1211/conference/2017-tgdf-筆記-遊戲人工智慧與關卡難易度/"
categories:
  - "Conference"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2017/07/24/2017-tgdf-%e7%ad%86%e8%a8%98-%e9%81%8a%e6%88%b2%e4%ba%ba%e5%b7%a5%e6%99%ba%e6%85%a7%e8%88%87%e9%97%9c%e5%8d%a1%e9%9b%a3%e6%98%93%e5%ba%a6/"
heroImage: "/assets/media/migrated/blog/2017-tgdf-_2-27749e3d05-w750.webp"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Speaker | Professor, National Taiwan University of Science and Technology | Wen-Kai Tai

_Wen-Kai Tai is a professor at National Taiwan University of Science and Technology and a member of the GAME Research Center and GAME Lab. His work covers Procedural Content Generation, game design automation, game AI, player modeling, multimedia applications, industry-academia R&D, consulting, and government research projects._

─ Excerpted from [TGDF](https://2017.tgdf.tw/speakers/wen-kai_tai/) official



> These are personal notes and may not fully represent the original speaker's intent.



### Other articles in this series

-   [2017 TGDF Notes: Creating 3D Japanese Animation Quality in a Small Indie Studio](/blog/2017/07/24/2017-tgdf-筆記-以小型獨立工作室塑造-3d-日式動畫畫質/)
-   [2017 TGDF Notes: Game AI and Level Difficulty](/blog/2017/07/24/2017-tgdf-筆記-遊戲人工智慧與關卡難易度/)
-   [2017 TGDF Notes: Finding a Path in a Crowded Market](/blog/2017/07/24/2017-tgdf-筆記-《地下城物語》─再滾燙的紅海都有屬於/)
-   [2017 TGDF Notes: Making the Future Present Through Rez Infinite](/blog/2017/07/24/2017-tgdf-筆記-透過《rez-infinite》讓未來成為現在/)
-   [2017 TGDF Notes: Lanota Development Experience](/blog/2017/07/24/2017-tgdf-筆記-《lanota》開發經驗分享/)
-   [2017 TGDF Notes: Postmortem on What Went Right and Wrong](/blog/2017/07/24/2017-tgdf-筆記-《獸魂戰起來》postmortem：我們做對和做錯的/)
-   [2017 TGDF Notes: The Art Direction of Detention](/blog/2017/07/24/2017-tgdf-筆記-《返校》美術風格設計/)
-   [2017 TGDF Notes: Visual Design Notes from Qubot](/blog/2017/07/24/2017-tgdf-筆記-角邊中的風景─《qubot-像素戰機》的視覺創/)
-   [2017 TGDF Notes: Survival Rules for Game Software Engineers](/blog/2017/07/24/2017-tgdf-筆記-遊戲軟體工程師生存守則/)



### AI goals

-   Tutorial
    -   Help new players learn
    -   Provide different difficulty settings
-   Training
    -   Experienced and competitive players often want to practice
    -   Strategically practice projects of certain difficulty
-   Replayability
    -   More dynamic game value settings
-   Robust to change
    -   Properties in the game that may need to be adjusted over time
    -   Maintenance is required every time it is updated, saving programmers valuable time



### Game process model

-   Game
    -   Game = current game state + rules/logic
    -   Current game state = (previous game state + previous player) + player set
-   State
    -   Game state = current game time plus player data such as HP, troop strength, and country
-   Player
    -   Player action decision = player + game status + player information
    -   Player action decision = composed of multiple different actions
-   Player Action (Partial Player)
    -   Player action = action algorithm + game state + player information
    -   Example: Are costs considered during production? Are population limits considered?
-   AI Portfolio
    -   AI portfolio = composed of multiple action algorithms



### Game case: 8-ball

Game flow:

![TGDF\_AI\_1](/assets/media/migrated/blog/tgdf_ai_1-1024x626-84b7d77429-w1024.webp)

Decision process:

`Player portfolio -> Strike action generation -> Table state evaluation -> Ball selection -> Shot execution`

![TGDF\_AI\_2](/assets/media/migrated/blog/tgdf_ai_2-9b470c73de-w996.webp)

Player portfolio: strategy and skill settings.

![TGDF\_AI\_3](/assets/media/migrated/blog/tgdf_ai_3-1024x750-64d6daf6e2-w1024.webp)

Strike action generation:

`Select hittable ball -> Select possible pocket -> Choose shot type -> Refine aim direction -> Search and optimize force`

![TGDF\_AI\_4](/assets/media/migrated/blog/tgdf_ai_4-cb61b26b53-w935.webp)
![TGDF\_AI\_5](/assets/media/migrated/blog/tgdf_ai_5-334a05213e-w830.webp)

Table state evaluation:

`Hit difficulty evaluation -> Ball evaluation -> Ball group evaluation -> Shot evaluation`

![TGDF\_AI\_6](/assets/media/migrated/blog/tgdf_ai_6-5ca22fc23d-w930.webp)

![TGDF\_AI\_7](/assets/media/migrated/blog/tgdf_ai_7-820e094851-w898.webp)



Select target ball:

-   Random numbers
-   Rule resource size
-   Monte Carlo tree search (MCTS) thinking time length

AI portfolio:

![TGDF\_AI\_8](/assets/media/migrated/blog/tgdf_ai_8-172ef515dc-w948.webp)

-   Shot generation
-   Table state evaluation
-   Shot evaluation
-   Select target ball

Control AI through profiles:

![TGDF\_AI\_9](/assets/media/migrated/blog/tgdf_ai_9-c55be3c484-w910.webp)

Table state estimation - combat behavior:

![TGDF\_AI\_10](/assets/media/migrated/blog/tgdf_ai_10-396b7497d8-w798.webp)

Table state estimation - core process architecture:

![TGDF\_AI\_11](/assets/media/migrated/blog/tgdf_ai_11-fa018ab078-w900.webp)

Table state estimation - experimental results:

![TGDF\_AI\_12](/assets/media/migrated/blog/tgdf_ai_12-77b1ce6b83-w896.webp)

### References

-   [[GDC 2017 Sharing Session] AI in Games](https://www.youtube.com/watch?v=IFuvnYoodT0)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
