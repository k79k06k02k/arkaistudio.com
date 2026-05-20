---
title: "Unity UGUI Principles (1): Canvas Rendering Mode"
originalTitle: "Unity UGUI 原理篇(一)：Canvas 渲染模式"
description: "A practical overview of Unity UGUI Canvas render modes and when each mode fits."
pubDate: "2016-03-25T18:03:56"
modDate: "2017-07-18T21:01:10"
legacyPath: "/blog/2016/03/25/unity-ugui-原理篇-一：canvas"
legacySlug: "unity-ugui-原理篇-一：canvas"
wpId: "190"
legacyAliases:
  - "/blog/190/"
  - "/blog/190/ugui/"
  - "/blog/190/ugui/unity-ugui-原理篇-一：canvas/"
  - "/blog/190/unity/"
  - "/blog/190/unity/unity-ugui-原理篇-一：canvas/"
categories:
  - "UGUI"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/03/25/unity-ugui-%e5%8e%9f%e7%90%86%e7%af%87-%e4%b8%80%ef%bc%9acanvas/"
heroImage: "/assets/media/migrated/blog/special-1-a9491c6460-w750.webp"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Goal

-   Understand the different UI Render Modes.



### Other articles in this series

-   [Unity UGUI Principles (1): Canvas Rendering Mode](/blog/2016/03/25/unity-ugui-原理篇-一：canvas/)
-   [Unity UGUI Principles (2): Canvas Scaler and UI Scaling](/blog/2016/03/28/unity-ugui-原理篇二：canvas-scaler-縮放核心/)
-   [Unity UGUI Principles (3): RectTransform](/blog/2016/05/02/unity-ugui-原理篇三：recttransform/)
-   [Unity UGUI Principles (4): EventSystem, Events, and Input](/blog/2016/05/19/unity-ugui-原理篇四：event-system-manager-事件與觸發/)
-   [Unity UGUI Principles (5): Auto Layout](/blog/2016/06/19/unity-ugui-原理篇五：auto-layout-自動佈局/)



### Environment

-   Windows 7
-   Unity 5.2.4



### Canvas

The Canvas component defines the space where Unity lays out and renders UI. Every UI element must live under a Canvas. In plain terms, Canvas is the root renderer for UGUI.

### Render Mode

Unity provides three UI render modes:

-   Screen Space - Overlay
-   Screen Space - Camera
-   World Space



#### Screen Space - Overlay

![Screen Space - Overlay](/assets/media/migrated/blog/screen-space-overlay-78110e67ad-w428.webp) In this mode, the UI does not reference a Camera. It renders directly on top of the scene.

-   Pixel Perfect: Makes images sharper, but adds performance cost. Heavy UI animation may become less smooth.
-   Sort Order: Controls draw order. Higher values render in front.



#### Screen Space - Camera

![Screen Space - Camera](/assets/media/migrated/blog/screen-space-camera-7d57d1553e-w426.webp) This mode uses a Camera as the reference and places the UI plane at a set distance in front of it. Because the UI depends on the Camera, it reacts to screen size, resolution, and frustum changes. Scene objects closer to the Camera than the UI plane can occlude the UI.

-   Render Camera: The Camera used for UI rendering.
-   Plane Distance: The distance between the UI plane and the Camera.
-   Sorting Layer: The Canvas sorting layer, configured under `Edit -> Project Settings -> Tags and Layers -> Sorting Layers`.
-   Order in Layer: The order inside the selected sorting layer. Higher values render in front.



#### World Space

![World Space](/assets/media/migrated/blog/world-space-7a0ae06442-w430.webp) World Space treats the Canvas as a GameObject in world coordinates. Use it when the UI should exist as part of the 3D scene.

-   Event Camera: The Camera that handles UI events such as click and drag. Only the assigned Camera can trigger those events.



### References

-   [Unity - Manual: Canvas](http://docs.unity3d.com/Manual/class-Canvas.html)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
