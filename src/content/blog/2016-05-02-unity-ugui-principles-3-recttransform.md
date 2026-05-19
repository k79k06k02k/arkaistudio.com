---
title: "Unity UGUI Principles (3): RectTransform"
originalTitle: "Unity UGUI 原理篇(三)：RectTransform"
description: "A Unity UGUI note explaining RectTransform, anchors, pivot behavior, Blueprint Mode, and Raw Edit Mode."
pubDate: "2016-05-02T01:42:39"
modDate: "2017-07-18T20:59:20"
legacyPath: "/blog/2016/05/02/unity-ugui-原理篇三：recttransform"
legacySlug: "unity-ugui-原理篇三：recttransform"
wpId: "334"
legacyAliases:
  - "/blog/334/"
  - "/blog/334/ugui/"
  - "/blog/334/ugui/unity-ugui-原理篇三：recttransform/"
  - "/blog/334/unity/"
  - "/blog/334/unity/unity-ugui-原理篇三：recttransform/"
categories:
  - "UGUI"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/05/02/unity-ugui-%e5%8e%9f%e7%90%86%e7%af%87%e4%b8%89%ef%bc%9arecttransform/"
heroImage: "/assets/migrated/blog/special-1-a9491c6460.png"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Goal

-   Understand the RectTransform component.
-   Understand anchors.
-   Understand pivot behavior.
-   Understand Blueprint Mode and Raw Edit Mode.



### Other articles in this series

-   [Unity UGUI Principles (1): Canvas Rendering Mode](/blog/2016/03/25/unity-ugui-原理篇-一：canvas/)
-   [Unity UGUI Principles (2): Canvas Scaler and UI Scaling](/blog/2016/03/28/unity-ugui-原理篇二：canvas-scaler-縮放核心/)
-   [Unity UGUI Principles (3): RectTransform](/blog/2016/05/02/unity-ugui-原理篇三：recttransform/)
-   [Unity UGUI Principles (4): EventSystem, Events, and Input](/blog/2016/05/19/unity-ugui-原理篇四：event-system-manager-事件與觸發/)
-   [Unity UGUI Principles (5): Auto Layout](/blog/2016/06/19/unity-ugui-原理篇五：auto-layout-自動佈局/)



### Environment

-   Windows 7
-   Unity 5.2.4



### RectTransform

![RectTransform\_01](/assets/migrated/blog/recttransform_01-cfede66183.png)

RectTransform is the UI-space counterpart of Transform. A Transform represents a point in space; a RectTransform represents a 2D rectangle. When both parent and child objects use RectTransform, the child can define its position and size relative to the parent's rectangle. In practice, RectTransform defines UI position, rotation, and size.

### Anchor

![Anchor\_01](/assets/migrated/blog/anchor_01-def97264fa.png)

Anchors define how a child UI element aligns to its parent. When both parent and child have RectTransform, the child uses Anchor Min and Anchor Max to describe its relationship to the parent rectangle. In the Scene view, the anchors appear as four small triangles around the object.

Anchor Min

The lower-left alignment point of the object. `(0, 0)` maps to the lower-left of the parent; `(1, 1)` maps to the upper-right.

Anchor Max

The upper-right alignment point of the object.

### ![](/assets/migrated/blog/anchor_03-07e47604ea.png)



#### Anchor location coordinates and relationships

When you drag the four anchor triangles, Unity shows proportional values. Those values describe how the child scales within the parent.

###  ![](/assets/migrated/blog/anchor_06-ba948d7cd3.png)

Suppose an Image under a Canvas has both Anchor Min and Anchor Max set to `(0.5, 0.5)`, as shown on the left. If Anchor Min changes to `(0.3, 0.5)` and Anchor Max changes to `(0.5, 0.7)`, the Inspector changes how it displays position and size.

![Anchor\_15](/assets/migrated/blog/anchor_15-d0a94fbe75.png)

When both anchors are at the same point, Unity shows coordinates and size. When the anchors define a rectangle, Unity shows the distances to that anchor rectangle instead.

![](/assets/migrated/blog/anchor_17-adde201bee.png)

Here are a few examples.

If five Images under a Canvas use Anchor Min and Anchor Max `(0.5, 0.5)`, each object aligns to the center of the parent. When the parent size changes, they stay centered.

![](/assets/migrated/blog/anchor_08-d6bdab0b3a.gif)

If an Image uses Anchor Min and Anchor Max `(0.0, 1.0)`, it aligns to the upper-left corner of the parent and stays fixed there as the parent size changes.

![Anchor\_09](/assets/migrated/blog/anchor_09-1729100d2f.gif)

If Anchor Min is `(0.0, 0.0)` and Anchor Max is `(1.0, 0.0)`, the object aligns to both lower corners. Its width changes with the parent.

![Anchor\_10](/assets/migrated/blog/anchor_10-94ef94f5a4.gif)

These examples show the important rule: child UI elements update their position and size based on their anchor relationship to the parent.

#### Original value

Parent Size is `(400, 350)`. Image Size is `(120, 105)`. Anchor Min is `(0.2, 0.5)`, and Anchor Max is `(0.5, 0.8)`.

![](/assets/migrated/blog/anchor_12-29a223f7c9.png)

#### Parent Size half time value

Parent Size becomes `(200, 175)`. Image Size becomes `(60, 52.5)`.

Image Size Width  = 400 \* 50% \* 30% = 60

Image Size Height = 350 \* 50% \* 30% = 52.5

Anchor Min remains `(0.2, 0.5)`, and Anchor Max remains `(0.5, 0.8)`. Because the parent has been reduced by half, the child updates through the same anchor ratio. This is how UGUI adapts UI size and position across different resolutions.

#### Anchor Presets

![AnchorPresets\_01](/assets/migrated/blog/anchorpresets_01-93396bf328.png)

Click the upper-left square in the RectTransform inspector to open Anchor Presets. It lists common anchor configurations for quick use. Hold Shift to change the Pivot at the same time. Hold Alt to change the position at the same time.

### Pivot

Pivot is the object's own center of operation. It affects rotation, scaling, and position. To edit UI Pivot in the Scene view, enable the Pivot button in the toolbar.

![Pivot\_01](/assets/migrated/blog/pivot_01-ad207ecaae.png)

Pivot `(0.5, 0.5)`:

![Pivot\_02](/assets/migrated/blog/pivot_02-88cf884787.gif)

Pivot `(0, 1)`:

![Pivot\_03](/assets/migrated/blog/pivot_03-01f53964d6.gif)

### Blue Print Mode, Raw Edit Mode

## ![BluePrint\_RawEdit\_01](/assets/migrated/blog/blueprint_rawedit_01-5741a6f475.png)



#### Blue Print Mode

Blueprint Mode ignores the object's Local Rotation and Local Scale, making it easier to adjust the UI element as if it were still in its original rotation and size.

![](/assets/migrated/blog/blueprintmode_m2-1024x711-319a12e5af.png)

#### Raw Edit Mode

Raw Edit Mode keeps the current position and size values when you edit Pivot and Anchor in the Inspector. Pay attention to the numeric fields while adjusting.

Adjusting Pivot in the Inspector:

![RawEditMode\_02](/assets/migrated/blog/raweditmode_02-94669a7d75.gif)

Adjusting Anchor in the Inspector:

![RawEditMode\_01](/assets/migrated/blog/raweditmode_01-49f7436dc4.gif)

### References

-   [Unity - Manual: Basic Layout](http://docs.unity3d.com/Manual/UIBasicLayout.html)
-   [Unity's GUI Adjustment Function Explained by RectTransform](http://tsubakit1.hateblo.jp/entry/2014/12/19/033946)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
