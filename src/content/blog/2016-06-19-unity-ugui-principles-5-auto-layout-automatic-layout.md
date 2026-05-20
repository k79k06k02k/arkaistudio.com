---
title: "Unity UGUI Principles (5): Auto Layout"
originalTitle: "Unity UGUI 原理篇(五)：Auto Layout 自動佈局"
description: "A Unity UGUI note explaining Auto Layout architecture, Layout Element sizing, Horizontal and Vertical Layout Groups, Grid Layout Group, and Content Size Fitter."
pubDate: "2016-06-19T15:20:19"
modDate: "2021-02-16T15:41:06"
legacyPath: "/blog/2016/06/19/unity-ugui-原理篇五：auto-layout-自動佈局"
legacySlug: "unity-ugui-原理篇五：auto-layout-自動佈局"
wpId: "542"
legacyAliases:
  - "/blog/542/"
  - "/blog/542/ugui/"
  - "/blog/542/ugui/unity-ugui-原理篇五：auto-layout-自動佈局/"
  - "/blog/542/unity/"
  - "/blog/542/unity/unity-ugui-原理篇五：auto-layout-自動佈局/"
categories:
  - "UGUI"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/06/19/unity-ugui-%e5%8e%9f%e7%90%86%e7%af%87%e4%ba%94%ef%bc%9aauto-layout-%e8%87%aa%e5%8b%95%e4%bd%88%e5%b1%80/"
heroImage: "/assets/media/migrated/blog/special-1-a9491c6460-w750.webp"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Goal

-   Understand the Auto Layout system architecture.
-   Understand how Layout Element defines element size.
-   Understand how Horizontal, Vertical, and Grid Layout Groups arrange elements.
-   Understand how Content Size Fitter and Aspect Ratio Fitter control size.



### Other articles in this series

-   [Unity UGUI Principles (1): Canvas Rendering Mode](/blog/2016/03/25/unity-ugui-原理篇-一：canvas/)
-   [Unity UGUI Principles (2): Canvas Scaler and UI Scaling](/blog/2016/03/28/unity-ugui-原理篇二：canvas-scaler-縮放核心/)
-   [Unity UGUI Principles (3): RectTransform](/blog/2016/05/02/unity-ugui-原理篇三：recttransform/)
-   [Unity UGUI Principles (4): EventSystem, Events, and Input](/blog/2016/05/19/unity-ugui-原理篇四：event-system-manager-事件與觸發/)
-   [Unity UGUI Principles (5): Auto Layout](/blog/2016/06/19/unity-ugui-原理篇五：auto-layout-自動佈局/)



### Environment

-   Windows 7
-   Unity 5.2.4



### Auto Layout System

The Auto Layout system is built on [RectTransform](http://docs.unity3d.com/Manual/class-RectTransform.html). It automatically adjusts size, position, and spacing for one or more UI elements.

The system has two main parts:

-   Layout Controllers: usually parent objects that arrange children.
-   Layout Elements: usually child objects that describe their sizing rules.

The basic architecture looks like this. This article focuses on the concept first; implementation details come later.

### ![AutoLayoutSystem\_01](/assets/media/migrated/blog/autolayoutsystem_01-1bac8f5958-w848.webp)



### [Layout Element (child object)](http://docs.unity3d.com/Manual/script-LayoutElement.html)

### ![](/assets/media/migrated/blog/layoutelement_01-98a0633667-w412.webp)

Layout Element describes the size requirements of an element:

-   Minimum Width
-   Minimum Height
-   Preferred Width
-   Preferred Height
-   Flexible Width
-   Flexible Height

After selecting a UI element, switch to Layout Properties at the bottom of the Inspector to inspect these values.

![LayoutElement\_05](/assets/media/migrated/blog/layoutelement_05-3502bcd9b3-w560.webp)
![LayoutElement\_03](/assets/media/migrated/blog/layoutelement_03-9f63515e4b-w428.webp)

Layout Controllers read Layout Element sizes and allocate children with these rules:

-   Allocate Minimum Size first.
-   If there is enough space, allocate Preferred Size.
-   If extra space remains, allocate Flexible Size.

The following images show how width is allocated.

### ![LayoutElement\_01](/assets/media/migrated/blog/layoutelement_01-98a0633667-w412.webp)

### ![LayoutElement\_02](/assets/media/migrated/blog/layoutelement_02-7345f20d92-w974.webp)

-   Allocate Minimum Size first: 300, shown in red.
-   If enough space remains, allocate Preferred Size: 300-500, shown in green.
-   If extra space remains, allocate Flexible Size: 1, shown as 500-700 in blue.

Flexible sizing is proportional. If multiple children have Flexible values, extra space is distributed according to those values. In the example below, `0.3` and `0.7` produce a `3:7` ratio.

### ![LayoutElement\_04](/assets/media/migrated/blog/layoutelement_04-10713af445-w624.webp)

One more detail: [Text](http://docs.unity3d.com/Manual/script-Text.html) and [Image](http://docs.unity3d.com/Manual/script-Image.html) components automatically calculate Preferred Size from their content.

### Layout Controllers (parent object)

#### Layout Group

Layout Group does not control the size of the parent object itself. It controls the size and position of child objects. In most cases, it allocates space from each child's minimum, preferred, and flexible sizes.

Layout Groups can be nested and come in three common types: [Horizontal](http://docs.unity3d.com/Manual/script-HorizontalLayoutGroup.html), [Vertical](http://docs.unity3d.com/Manual/script-VerticalLayoutGroup.html), and [Grid](http://docs.unity3d.com/Manual/script-GridLayoutGroup.html).

#### [Horizontal Layout Group](http://docs.unity3d.com/Manual/script-HorizontalLayoutGroup.html)

![HorizontalLayoutGroup\_00](/assets/media/migrated/blog/horizontallayoutgroup_00-2d24953896-w430.webp)

Horizontal Layout Group arranges child objects along the horizontal axis.

Component path: `Component -> Layout -> Horizontal Layout Group`.

-   Padding: internal spacing.
-   Spacing: space between elements.
-   Child Alignment: alignment when children do not fill all available space.
-   Child Force Expand: forces children to fill available space.

Example setup:

1.  Open a new scene: `File -> New Scene`.
2.  Add a Canvas: `GameObject -> UI -> Canvas`.
3.  Add an empty object under the Canvas as the Layout Controller.
4.  Add Horizontal Layout Group to that parent object.
5.  Create five Button children under the parent. Their sizes update automatically when the parent changes.

![HorizontalLayoutGroup\_02](/assets/media/migrated/blog/horizontallayoutgroup_02-888a888b8e-animated.webp)

At this point, the Button RectTransforms cannot be edited directly because the Horizontal Layout Group controls them. Unity shows which Layout Group is controlling the RectTransform.

![HorizontalLayoutGroup\_09](/assets/media/migrated/blog/horizontallayoutgroup_09-892350fb8e-w413.webp)

Adjust Padding to see the internal spacing.

![HorizontalLayoutGroup\_03](/assets/media/migrated/blog/horizontallayoutgroup_03-ff09e6fe11-w544.webp)

Adjust Spacing to see the gap between elements.

![HorizontalLayoutGroup\_04](/assets/media/migrated/blog/horizontallayoutgroup_04-98f247f8fb-w620.webp)

Next, add Layout Element to the five Buttons so their default sizes can be overridden manually.

Component path: `Component -> Layout -> Layout Element`.

Uncheck `Child Force Expand Width` on the Horizontal Layout Group so children do not automatically fill all extra space. Their size now comes from Layout Element.

Review the allocation rules:

-   Allocate Minimum Size first.
-   If enough space remains, allocate Preferred Size.
-   If extra space remains, allocate Flexible Size.

Set the Min Width values of the five Buttons to `20`, `30`, `40`, `50`, and `60`. You can see each Button's width distribution. Changing the parent size does not change the children yet, because only Minimum Width has been allocated.

![HorizontalLayoutGroup\_11](/assets/media/migrated/blog/horizontallayoutgroup_11-9074ecd7ec-animated.webp)

Change Child Alignment to see how the elements align inside the parent.

![HorizontalLayoutGroup\_16](/assets/media/migrated/blog/horizontallayoutgroup_16-761e675b81-animated.webp)

Parent Layout Properties:

`Min Width = button widths (20 + 30 + 40 + 50 + 60 = 200) + Spacing (40) + left/right Padding (20) = 260`

![HorizontalLayoutGroup\_10](/assets/media/migrated/blog/horizontallayoutgroup_10-64a651a6ea-w427.webp)

Now adjust the first Button's Layout Element as shown below and set Preferred Width to `100`.

![HorizontalLayoutGroup\_13](/assets/media/migrated/blog/horizontallayoutgroup_13-7cbab4c058-w423.webp)

1.  Allocate Minimum Size first: `20`.
2.  If enough space remains, allocate Preferred Size from `20` to `100`.

![HorizontalLayoutGroup\_12](/assets/media/migrated/blog/horizontallayoutgroup_12-84b29a8926-animated.webp)

Next, set Flexible Width to `1`.

![HorizontalLayoutGroup\_14](/assets/media/migrated/blog/horizontallayoutgroup_14-45143c561f-w422.webp)

-   Allocate Minimum Size first: `20`.
-   If enough space remains, allocate Preferred Size from `20` to `100`.
-   If extra space remains, allocate the remaining Flexible Size.

![HorizontalLayoutGroup\_15](/assets/media/migrated/blog/horizontallayoutgroup_15-b493d25d06-animated.webp)

Now enable Child Force Expand Width on the Horizontal Layout Group to force child objects to fill the available space.

-   Allocate Minimum Size first: `20`.
-   If enough space remains, allocate Preferred Size from `20` to `100`.
-   If extra space remains, allocate Flexible Size and Child Force Expand Width.

![HorizontalLayoutGroup\_17](/assets/media/migrated/blog/horizontallayoutgroup_17-25ef6fbc8b-animated.webp)

Conclusion: Horizontal Layout Group allocates Minimum Size first, then Preferred Size, then Flexible Size and Child Force Expand. That is the core rule behind how it reads Layout Element values and assigns child sizes.

#### [Vertical Layout Group](http://docs.unity3d.com/Manual/script-VerticalLayoutGroup.html)

![VerticalLayoutGroup\_00](/assets/media/migrated/blog/verticallayoutgroup_00-7546773767-w428.webp)

Vertical Layout Group arranges child objects along the vertical axis. It works the same way as Horizontal Layout Group, but uses height instead of width.

Component path: `Component -> Layout -> Vertical Layout Group`.

#### [Grid Layout Group](http://docs.unity3d.com/Manual/script-GridLayoutGroup.html)

![GridLayoutGroup\_00](/assets/media/migrated/blog/gridlayoutgroup_00-98109dde32-w429.webp)

Grid Layout Group arranges child objects in a grid.

Component path: `Component -> Layout -> Grid Layout Group`.

-   Padding: internal spacing.
-   Cell Size: width and height of each element.

![GridLayoutGroup\_01](/assets/media/migrated/blog/gridlayoutgroup_01-10598d1d73-animated.webp)

-   Spacing: space between elements.
-   Start Corner: the corner where layout starts: upper left, upper right, lower left, or lower right.

![GridLayoutGroup\_02](/assets/media/migrated/blog/gridlayoutgroup_02-e3d013c245-animated.webp)

-   Start Axis: horizontal or vertical arrangement.

![GridLayoutGroup\_03](/assets/media/migrated/blog/gridlayoutgroup_03-6319ea02da-animated.webp)

-   Child Alignment: alignment when children do not fill all available space.
-   Constraint: layout restriction.
    -   Flexible: automatically arrange according to available size.
    -   Fixed Column Count: limit the number of columns.
    -   Fixed Row Count: limit the number of rows.



### Layout Fitter

Layout Fitters control the size of the Layout Controller itself. The size can come from child objects or a configured aspect ratio. The two common fitters are [Content Size Fitter](http://docs.unity3d.com/Manual/script-ContentSizeFitter.html) and [Aspect Ratio Fitter](http://docs.unity3d.com/Manual/script-AspectRatioFitter.html).

#### [Content Size Fitter](http://docs.unity3d.com/Manual/script-ContentSizeFitter.html)

![ContentSizeFitter\_00](/assets/media/migrated/blog/contentsizefitter_00-ea8b365b20-w459.webp)

Content Size Fitter controls the size of the parent object based on the Minimum or Preferred size of its child objects. The resize direction can be changed through Pivot.

Component path: `Component -> Layout -> Content Size Fitter`.

-   Horizontal Fit / Vertical Fit: controls horizontal and vertical fitting.
    -   None: no adjustment.
    -   Min Size: fit to the child's Minimum size.
    -   Preferred Size: fit to the child's Preferred size.

Example requirement: make the parent size follow the child size. The result looks like this. A black outline is added so the parent size is easier to see.

#### ![ContentSizeFitter\_02](/assets/media/migrated/blog/contentsizefitter_02-709b1c9fa7-animated.webp)

Setup:

1.  Open a new Scene: `File -> New Scene`.
2.  Add a Canvas: `GameObject -> UI -> Canvas`.
3.  Add an empty object under the Canvas as the parent Layout Controller.
4.  Add Horizontal Layout Group to the parent.
5.  Add a Button child.

At this stage, Horizontal Layout Group controls the child size through Layout Element values, but it does not resize the parent itself.

#### ![ContentSizeFitter\_01](/assets/media/migrated/blog/contentsizefitter_01-32d2a1efbe-animated.webp)

Add Layout Element to the Button, override the default size, and set Minimum Width to `100`.

Component path: `Component -> Layout -> Layout Element`.

Add Content Size Fitter to the parent. Set Horizontal Fit to `Min Size`, so the parent width comes from the child's Minimum Width.

![ContentSizeFitter\_04](/assets/media/migrated/blog/contentsizefitter_04-78ef2680a1-w426.webp)

If you duplicate the Button, the parent size now changes with the children.

![ContentSizeFitter\_02](/assets/media/migrated/blog/contentsizefitter_02-709b1c9fa7-animated.webp)

Adjust the parent's Pivot to control the resize direction.

![ContentSizeFitter\_03](/assets/media/migrated/blog/contentsizefitter_03-eb9659b229-animated.webp)

The full pattern is: use Horizontal Layout Group to arrange child objects, use Layout Element to define child size, then use Content Size Fitter to make the parent read those child sizes and resize itself.

#### [Aspect Ratio Fitter](http://docs.unity3d.com/Manual/script-AspectRatioFitter.html)

![AspectRatioFitter\_00](/assets/media/migrated/blog/aspectratiofitter_00-d00f94e0a9-w424.webp)

Aspect Ratio Fitter controls the size of the parent object based on an aspect ratio. Pivot controls the resize direction.

Component path: `Component -> Layout -> Aspect Ratio Fitter`.

Aspect Mode options:

-   None: no adjustment.
-   Width Controls Height: width drives height according to the ratio.

#### ![AspectRatioFitter\_01\_01](/assets/media/migrated/blog/aspectratiofitter_01_01-ad20123b4a-animated.webp)

When width changes, height changes proportionally.

![AspectRatioFitter\_01\_02](/assets/media/migrated/blog/aspectratiofitter_01_02-76da080bc3-animated.webp)

Height Controls Width uses height as the base and changes width according to the ratio.

#### ![AspectRatioFitter\_02\_01](/assets/media/migrated/blog/aspectratiofitter_02_01-938104db52-animated.webp)

When height changes, width changes proportionally.

![AspectRatioFitter\_02\_02](/assets/media/migrated/blog/aspectratiofitter_02_02-b575474ea5-animated.webp)

Fit In Parent automatically adjusts width, height, position, and anchors so the graphic fits entirely inside the parent. It may leave empty space.

![](/assets/media/migrated/blog/aspectratiofitter_03_03-542fae9c98-animated.webp)

When the parent size changes, the object fits inside it according to the ratio.

![AspectRatioFitter\_03\_02](/assets/media/migrated/blog/aspectratiofitter_03_02-7b08855e14-animated.webp)

Envelope Parent adjusts width, height, position, and anchors so the graphic fully covers the parent. It may exceed the parent's bounds.

![](/assets/media/migrated/blog/aspectratiofitter_04_01-c916f7ef4e-animated.webp)

When the parent size changes, the object continues to cover it according to the ratio.

![AspectRatioFitter\_04\_02](/assets/media/migrated/blog/aspectratiofitter_04_02-ed900c6714-animated.webp)

Aspect Ratio is `width / height`.

#### Difference

Content Size Fitter sizes an object from its children. Aspect Ratio Fitter sizes an object from a numeric ratio.

### Postscript

Auto Layout is one of the UI features worth learning properly. It arranges multiple UI elements quickly, reacts to size changes, and works well with nested layouts. It also makes later UI changes less painful, which is not glamorous but matters in production.

### References

-   [Unity - Manual: Auto Layout](http://docs.unity3d.com/Manual/UIAutoLayout.html)
-   [Unity - Manual: Auto Layout UI Reference](http://docs.unity3d.com/Manual/comp-UIAutoLayout.html)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
