---
title: "2017 TGDF Notes: Survival Rules for Game Software Engineers"
originalTitle: "2017 TGDF 筆記 – 遊戲軟體工程師生存守則"
description: "TGDF notes from Rayark's talk on the habits, responsibilities, and tradeoffs of game software engineers."
pubDate: "2017-07-24T16:00:18"
modDate: "2018-08-31T11:47:06"
legacyPath: "/blog/2017/07/24/2017-tgdf-筆記-遊戲軟體工程師生存守則"
legacySlug: "2017-tgdf-筆記-遊戲軟體工程師生存守則"
wpId: "1351"
legacyAliases:
  - "/blog/1351/"
  - "/blog/1351/conference/"
  - "/blog/1351/conference/2017-tgdf-筆記-遊戲軟體工程師生存守則/"
categories:
  - "Conference"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2017/07/24/2017-tgdf-%e7%ad%86%e8%a8%98-%e9%81%8a%e6%88%b2%e8%bb%9f%e9%ab%94%e5%b7%a5%e7%a8%8b%e5%b8%ab%e7%94%9f%e5%ad%98%e5%ae%88%e5%89%87/"
heroImage: "/assets/migrated/blog/2017-tgdf-_2-27749e3d05.jpg"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Speaker | [Rayark Games](https://www.rayark.com/) | Alvin Chung

_Alvin Chung is the CTO and co-founder of Rayark. He worked on front-end and back-end development for games including Implosion, VOEZ, Sdorica, and Soul of Eden. He also helped plan development processes and build internal infrastructure for Rayark's game software development._

─ Excerpted from [TGDF](https://2017.tgdf.tw/speakers/alvin_chung/) official



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



### Responsibilities

-   Ensure code quality
-   Build an efficient and friendly development environment
-   Recruit and train talent



### Programmer ratio

Roughly 3X programmers out of 14X total staff, or about 20%.

### Deemo program architecture

![TGDF\_Programmer\_1](/assets/migrated/blog/tgdf_programmer_1-45a6121cda.png)

### Engineering career

-   Coding skill
-   Knowledge
-   Direction

### Coding skill

-   Object-oriented programming (Java / C# / C++)
    -   Single Responsibility Principle
    -   Open Close Principle
    -   Liskov's Substitution Principle
    -   Interface Segregation Principle
    -   Dependency Inversion Principle
-   Functional programming (Python / JavaScript / Go)
    -   Pure Function
    -   Immutable State
    -   Function Composition
    -   Avoid shared state
    -   Avoid side effects
-   Onion design

![TGDF\_Programmer\_2](/assets/migrated/blog/tgdf_programmer_2-1024x768-85d49d1092.jpg)

-   Abstract design: interfaces should express intent, not implementation.

![TGDF\_Programmer\_3](/assets/migrated/blog/tgdf_programmer_3-349ed92a59.png)



### Knowledge

-   GC (Garbage Collection)
    -   Heap
    -   Boxing
    -   Value type
    -   Reference type
-   Trial and error vs. best solution
-   Systematic learning
    -   Algorithms/data structures
    -   Computer architecture
    -   Operating systems
    -   Network architecture
    -   Graphics rendering
    -   Software engineering
    -   Systems and signals
-   Learning on the job
-   Engine familiarity
-   Learning new things

![TGDF\_Programmer\_5](/assets/migrated/blog/tgdf_programmer_5-1024x762-3edf53e74b.jpg)

### Direction

-   Do not forget the nature of engineering work.

Being passionate about games is a double-edged sword. If you are not careful, you end up only discussing game content and neglecting engineering fundamentals.

![TGDF\_Programmer\_6](/assets/migrated/blog/tgdf_programmer_6-1024x791-455617296f.jpg)

-   Become an expert.

![TGDF\_Programmer\_4](/assets/migrated/blog/tgdf_programmer_4-5813033f2c.jpg)



### Other notes

-   Time must be spent on program architecture planning, project maintenance, function expansion, and team understanding.
-   Architecture planning process: sample code -> architecture documentation -> code review.



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
