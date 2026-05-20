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
heroImage: "/assets/media/migrated/blog/special-2-8a969f23c2-w750.webp"
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

##  [![](/assets/media/migrated/blog/icon_github-02a86a0d50-w212.webp)](https://github.com/k79k06k02k/KKTools)



### AssetBundle related

#### AssetBundle Analyze

Usage: Select any AssetBundle file for analysis.

![AssetBundleAnalyzer\_01](/assets/media/migrated/blog/assetbundleanalyzer_01-655ad72a36-w712.webp)

#### AssetBundle Watch

**![notice](/assets/media/migrated/blog/notice-76af5ba665-w48.webp) Note: Only applies to Unity 5's newer AssetBundle system.**

Usage: Display either the selected bundle or all bundles. Files are grouped by AssetBundle Name, so you can quickly see which assets belong to which bundle.

![AssetBundleWatch\_01](/assets/media/migrated/blog/assetbundlewatch_01-fc67ce6bdd-w776.webp)
![AssetBundleWatch\_02](/assets/media/migrated/blog/assetbundlewatch_02-79855f0dc7-w776.webp)

#### AssetBundle Build (AssetBundle Build)

**![notice](/assets/media/migrated/blog/notice-76af5ba665-w48.webp) Note: Only applies to Unity 5's newer AssetBundle system.**

Usage: Select the target platform, then build the AssetBundle.

![AssetBundleBuild\_01](/assets/media/migrated/blog/assetbundlebuild_01-edb00065b8-w614.webp)

#### AssetBundle Build All Platform (AssetBundle Build All Platform)

**![notice](/assets/media/migrated/blog/notice-76af5ba665-w48.webp) Note: Only applies to Unity 5's newer AssetBundle system.**

Usage: Build AssetBundles for every configured platform. The platform list can be adjusted in code.

![AssetBundleBuildAllPlatform\_01](/assets/media/migrated/blog/assetbundlebuildallplatform_01-d612898f1f-w432.webp)

#### Print out all current AssetBundle Names (AssetBundle Show All Name)

**![notice](/assets/media/migrated/blog/notice-76af5ba665-w48.webp) Note: Only applies to Unity 5's newer AssetBundle system.**

Usage: Print all current AssetBundle Names to the Console.

![AssetBundleShowAllName\_01](/assets/media/migrated/blog/assetbundleshowallname_01-c7fed429a8-w432.webp)

### Create files related

#### Make Project Folders

Usage: Select the folder set you want to create.

![MakeFolders\_01](/assets/media/migrated/blog/makefolders_01-fc6db957cb-w414.webp)

### Search related

#### Object Finder (Finder)

Usage: Enter a search string, then choose whether to search Scene objects or Prefabs. Filters narrow the target type.

![GameObjectFinder\_01](/assets/media/migrated/blog/gameobjectfinder_01-d44950bdee-w814.webp)

### Prefab related

#### Prefab Tool

Usage: Supports two workflows: `Create` and `Apply`. This makes it easier to operate on several Prefabs, which older Unity versions did not handle well by default.

![PrefabTool\_01](/assets/media/migrated/blog/prefabtool_01-01429e4d26-w609.webp)
![PrefabTool\_02](/assets/media/migrated/blog/prefabtool_02-8ad53b6a60-w609.webp)
![PrefabTool\_03](/assets/media/migrated/blog/prefabtool_03-56a621ac78-w609.webp)

### UGUI related

#### UGUI Tool

Supported operations:

-   Anchors aligned to corners (Anchors to Corners)
-   Corners to Anchors
-   Mirror Horizontally Around Anchors
-   Flip anchors and images horizontally around the parent's center point (Mirror Horizontally Around Parent Center)
-   Mirror Vertically Around Anchors
-   Flip anchors and images vertically around the parent's center point (Mirror Vertically Around Parent Center)

![UGUITool\_01](/assets/media/migrated/blog/uguitool_01-61803806e9-w414.webp)

### Window related

#### Scene Watcher

Usage: Add scenes under `Unity -> File -> Build Settings`, then click a scene name in the tool to switch scenes.

![SceneWatcher\_01](/assets/media/migrated/blog/scenewatcher_01-04e0e6c238-w348.webp)

### Show related

#### Display object icon in Hierarchy

![ShowIconInHierarchy\_02](/assets/media/migrated/blog/showiconinhierarchy_02-0c4131556f-w328.webp)

#### Show and edit Canvas and Sprite sorting order in Hierarchy

![ShowSortingOrder\_02](/assets/media/migrated/blog/showsortingorder_02-c78205ed29-w234.webp)

#### Show Position, Rotation, and Scale reset buttons under Transform in Inspector

![TransformInspectorResetEditor\_02](/assets/media/migrated/blog/transforminspectorreseteditor_02-22f8f30b3d-w280.webp)

### Postscript

These editor tools are not complicated, but they remove many tiny interruptions from day-to-day work. Once you understand the pattern, you can build similar tools for your own project needs and keep responsibilities clearer across the team.

### References

-   [Unity Wiki](http://wiki.unity3d.com)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
