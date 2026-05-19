---
title: "An Engineer's Toolbox (1): Utility.cs Convenience Helpers"
originalTitle: "屬於工程師的專用工具箱(一)：便捷工具類別(Utility.cs)"
description: "A small Unity utility class for common operations such as instantiating objects, loading resources, formatting values, and reducing repeated code."
pubDate: "2016-03-25T02:07:13"
modDate: "2017-07-18T17:34:47"
legacyPath: "/blog/2016/03/25/屬於工程師的專用工具箱一：便捷工具類別utility-cs"
legacySlug: "屬於工程師的專用工具箱一：便捷工具類別utility-cs"
wpId: "139"
legacyAliases:
  - "/blog/139/"
  - "/blog/139/tool/"
  - "/blog/139/tool/屬於工程師的專用工具箱一：便捷工具類別utility-cs/"
  - "/blog/139/unity/"
  - "/blog/139/unity/屬於工程師的專用工具箱一：便捷工具類別utility-cs/"
categories:
  - "Tool"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/03/25/%e5%b1%ac%e6%96%bc%e5%b7%a5%e7%a8%8b%e5%b8%ab%e7%9a%84%e5%b0%88%e7%94%a8%e5%b7%a5%e5%85%b7%e7%ae%b1%e4%b8%80%ef%bc%9a%e4%be%bf%e6%8d%b7%e5%b7%a5%e5%85%b7%e9%a1%9e%e5%88%a5utility-cs/"
heroImage: "/assets/migrated/blog/special-2-8a969f23c2.png"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Game projects always collect small repeated operations: instantiating objects, loading resources, formatting values, and cleaning up transforms. I usually put these helpers in one utility class and expose them as static methods, so other scripts can call them without dragging extra state around.



### Other articles in this series

-   [An Engineer's Toolbox (1): Utility.cs Convenience Helpers](/blog/2016/03/25/屬於工程師的專用工具箱一：便捷工具類別utility-cs/)
-   [An Engineer's Toolbox (2): Singleton and Debug Filtering](/blog/2016/03/25/屬於工程師的專用工具箱二：常用工具singleton、debug過濾/)
-   [An Engineer's Toolbox (3): Unity Editor Tools](/blog/2016/04/26/屬於工程師的專用工具箱三：編輯工具editor-tools/)
-   [An Engineer's Toolbox (4): Recommended Free Unity Plugins](/blog/2016/05/02/屬於工程師的專用工具箱四：推薦-plugin-免費篇/)



### Classification

-   system
-   Safety
-   UGUI
-   GameObject
-   Transform
-   Sprite
-   Time
-   Format
-   Resource reading
-   other



### Utility class (Utility.cs)

-   [Source code](https://github.com/k79k06k02k/Utility/blob/master/Scripts/Utility.cs)
-   Call pattern: `Utility.[Category].[Method]`

```csharp
Utility.GameObjectRelate.ClearChildren(gameObject.transform);
```



### Postscript

This is not meant to be a perfect utility library. These helpers grow through production work, one repetitive annoyance at a time. If you have useful snippets, share them and I can fold them into the toolset.

I also recommend the old [Unity Wiki](http://wiki.unity3d.com/index.php/Main_Page). It contains scripts, shaders, particle examples, small tools, and plenty of rough but useful material.

## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
