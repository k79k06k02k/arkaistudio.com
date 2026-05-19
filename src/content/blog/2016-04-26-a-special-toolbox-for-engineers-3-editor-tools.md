---
title: "An Engineer's Toolbox (3): Unity Editor Tools"
originalTitle: "屬於工程師的專用工具箱(三)：編輯工具(Editor Tools)"
description: "A collection of Unity editor tools for AssetBundle inspection, prefab workflows, object search, UGUI operations, scene switching, and hierarchy display helpers."
pubDate: "2016-04-26T10:36:13"
modDate: "2017-07-18T18:18:46"
legacyPath: "/blog/2016/04/26/屬於工程師的專用工具箱三：編輯工具editor-tools"
legacySlug: "屬於工程師的專用工具箱三：編輯工具editor-tools"
wpId: "247"
legacyAliases:
  - "/blog/247/"
  - "/blog/247/tool/"
  - "/blog/247/tool/屬於工程師的專用工具箱三：編輯工具editor-tools/"
  - "/blog/247/unity/"
  - "/blog/247/unity/屬於工程師的專用工具箱三：編輯工具editor-tools/"
categories:
  - "Tool"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/04/26/%e5%b1%ac%e6%96%bc%e5%b7%a5%e7%a8%8b%e5%b8%ab%e7%9a%84%e5%b0%88%e7%94%a8%e5%b7%a5%e5%85%b7%e7%ae%b1%e4%b8%89%ef%bc%9a%e7%b7%a8%e8%bc%af%e5%b7%a5%e5%85%b7editor-tools/"
heroImage: "/assets/migrated/blog/special-2-8a969f23c2.png"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### This article introduces a set of Unity editor tools. The point is simple: reduce repetitive editor work, save time, and keep attention on actual development instead of clicking the same controls forever.



### Other articles in this series

-   [An Engineer's Toolbox (1): Utility.cs Convenience Helpers](/blog/2016/03/25/屬於工程師的專用工具箱一：便捷工具類別utility-cs/)
-   [An Engineer's Toolbox (2): Singleton and Debug Filtering](/blog/2016/03/25/屬於工程師的專用工具箱二：常用工具singleton、debug過濾/)
-   [An Engineer's Toolbox (3): Unity Editor Tools](/blog/2016/04/26/屬於工程師的專用工具箱三：編輯工具editor-tools/)
-   [An Engineer's Toolbox (4): Recommended Free Unity Plugins](/blog/2016/05/02/屬於工程師的專用工具箱四：推薦-plugin-免費篇/)



### Classification

-   AssetBundle related
-   Create files related
-   Search related
-   Prefab related
-   UGUI related
-   Window related
-   Show related



### Source code

##  [![](/assets/migrated/blog/icon_github-02a86a0d50.png)](https://github.com/k79k06k02k/KKTools)



### AssetBundle related

#### AssetBundle Analyze

Usage: Select any AssetBundle file for analysis.

![AssetBundleAnalyzer\_01](/assets/migrated/blog/assetbundleanalyzer_01-655ad72a36.png)

#### AssetBundle Watch

**![notice](/assets/migrated/blog/notice-76af5ba665.png) Note: Only applies to Unity 5's newer AssetBundle system.**

Usage: Display either the selected bundle or all bundles. Files are grouped by AssetBundle Name, so you can quickly see which assets belong to which bundle.

![AssetBundleWatch\_01](/assets/migrated/blog/assetbundlewatch_01-fc67ce6bdd.png)
![AssetBundleWatch\_02](/assets/migrated/blog/assetbundlewatch_02-79855f0dc7.png)

#### AssetBundle Build (AssetBundle Build)

**![notice](/assets/migrated/blog/notice-76af5ba665.png) Note: Only applies to Unity 5's newer AssetBundle system.**

Usage: Select the target platform, then build the AssetBundle.

![AssetBundleBuild\_01](/assets/migrated/blog/assetbundlebuild_01-edb00065b8.png)

#### AssetBundle Build All Platform (AssetBundle Build All Platform)

**![notice](/assets/migrated/blog/notice-76af5ba665.png) Note: Only applies to Unity 5's newer AssetBundle system.**

Usage: Build AssetBundles for every configured platform. The platform list can be adjusted in code.

![AssetBundleBuildAllPlatform\_01](/assets/migrated/blog/assetbundlebuildallplatform_01-d612898f1f.png)

#### Print out all current AssetBundle Names (AssetBundle Show All Name)

**![notice](/assets/migrated/blog/notice-76af5ba665.png) Note: Only applies to Unity 5's newer AssetBundle system.**

Usage: Print all current AssetBundle Names to the Console.

![AssetBundleShowAllName\_01](/assets/migrated/blog/assetbundleshowallname_01-c7fed429a8.png)

### Create files related

#### Make Project Folders

Usage: Select the folder set you want to create.

![MakeFolders\_01](/assets/migrated/blog/makefolders_01-fc6db957cb.png)

### Search related

#### Object Finder (Finder)

Usage: Enter a search string, then choose whether to search Scene objects or Prefabs. Filters narrow the target type.

![GameObjectFinder\_01](/assets/migrated/blog/gameobjectfinder_01-d44950bdee.png)

### Prefab related

#### Prefab Tool

Usage: Supports two workflows: `Create` and `Apply`. This makes it easier to operate on several Prefabs, which older Unity versions did not handle well by default.

![PrefabTool\_01](/assets/migrated/blog/prefabtool_01-01429e4d26.png)
![PrefabTool\_02](/assets/migrated/blog/prefabtool_02-8ad53b6a60.png)
![PrefabTool\_03](/assets/migrated/blog/prefabtool_03-56a621ac78.png)

### UGUI related

#### UGUI Tool

Supported operations:

-   Anchors aligned to corners (Anchors to Corners)
-   Corners to Anchors
-   Mirror Horizontally Around Anchors
-   Flip anchors and images horizontally around the parent's center point (Mirror Horizontally Around Parent Center)
-   Mirror Vertically Around Anchors
-   Flip anchors and images vertically around the parent's center point (Mirror Vertically Around Parent Center)

![UGUITool\_01](/assets/migrated/blog/uguitool_01-61803806e9.png)

### Window related

#### Scene Watcher

Usage: Add scenes under `Unity -> File -> Build Settings`, then click a scene name in the tool to switch scenes.

![SceneWatcher\_01](/assets/migrated/blog/scenewatcher_01-04e0e6c238.png)

### Show related

#### Display object icon in Hierarchy

![ShowIconInHierarchy\_02](/assets/migrated/blog/showiconinhierarchy_02-0c4131556f.png)

#### Show and edit Canvas and Sprite sorting order in Hierarchy

![ShowSortingOrder\_02](/assets/migrated/blog/showsortingorder_02-c78205ed29.png)

#### Show Position, Rotation, and Scale reset buttons under Transform in Inspector

![TransformInspectorResetEditor\_02](/assets/migrated/blog/transforminspectorreseteditor_02-22f8f30b3d.png)

### Postscript

These editor tools are not complicated, but they remove many tiny interruptions from day-to-day work. Once you understand the pattern, you can build similar tools for your own project needs and keep responsibilities clearer across the team.

### References

-   [Unity Wiki](http://wiki.unity3d.com)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
