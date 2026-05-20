---
title: "Unity UGUI Principles (2): Canvas Scaler and UI Scaling"
originalTitle: "Unity UGUI 原理篇(二)：Canvas Scaler 縮放核心"
description: "A breakdown of Unity Canvas Scaler modes, Pixels Per Unit, Reference Pixels Per Unit, Scale Factor, and how Canvas size changes with screen resolution."
pubDate: "2016-03-28T10:48:31"
modDate: "2018-06-27T17:36:56"
legacyPath: "/blog/2016/03/28/unity-ugui-原理篇二：canvas-scaler-縮放核心"
legacySlug: "unity-ugui-原理篇二：canvas-scaler-縮放核心"
wpId: "24"
legacyAliases:
  - "/blog/24/"
  - "/blog/24/ugui/"
  - "/blog/24/ugui/unity-ugui-原理篇二：canvas-scaler-縮放核心/"
  - "/blog/24/unity/"
  - "/blog/24/unity/unity-ugui-原理篇二：canvas-scaler-縮放核心/"
categories:
  - "UGUI"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/03/28/unity-ugui-%e5%8e%9f%e7%90%86%e7%af%87%e4%ba%8c%ef%bc%9acanvas-scaler-%e7%b8%ae%e6%94%be%e6%a0%b8%e5%bf%83/"
heroImage: "/assets/media/migrated/blog/special-1-a9491c6460-w750.webp"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Goal

-   Understand the available UI Scale Modes.
-   Understand Pixels Per Unit.
-   Understand Canvas Scale Factor.
-   Understand how Reference Resolution, Screen Size, and Canvas Size relate to one another.



### Other articles in this series

-   [Unity UGUI Principles (1): Canvas Rendering Mode](/blog/2016/03/25/unity-ugui-原理篇-一：canvas/)
-   [Unity UGUI Principles (2): Canvas Scaler and UI Scaling](/blog/2016/03/28/unity-ugui-原理篇二：canvas-scaler-縮放核心/)
-   [Unity UGUI Principles (3): RectTransform](/blog/2016/05/02/unity-ugui-原理篇三：recttransform/)
-   [Unity UGUI Principles (4): EventSystem, Events, and Input](/blog/2016/05/19/unity-ugui-原理篇四：event-system-manager-事件與觸發/)
-   [Unity UGUI Principles (5): Auto Layout](/blog/2016/06/19/unity-ugui-原理篇五：auto-layout-自動佈局/)



### Environment

-   Windows 7
-   Unity 5.2.4



### Canvas Scaler

Canvas Scaler controls the overall size and pixel density of UI elements under a Canvas. Its scale settings affect child UI elements, including font sizes and image bounds.

### Size

-   Reference Resolution: the default design resolution.
-   Screen Size: the current device or game window resolution.
-   Canvas Size: the width and height of the Canvas RectTransform.

![size-1](/assets/media/migrated/blog/size-1-300x205-9fa6302636-w300.webp)

![size-2](/assets/media/migrated/blog/size-2-300x194-c94baa0e8f-w300.webp)

### Scale Factor

[`Canvas.scaleFactor`](http://docs.unity3d.com/ScriptReference/Canvas-scaleFactor.html) scales the entire Canvas. It controls how Canvas Size maps to Screen Size. First, look at Unity's own implementation.

**CanvasScaler.cs**

```csharp
protected void SetScaleFactor(float scaleFactor)
{
    if (scaleFactor == m_PrevScaleFactor)
        return;

    m_Canvas.scaleFactor = scaleFactor;
    m_PrevScaleFactor = scaleFactor;
}
```

The code shows that Canvas Scaler changes the Canvas Scale Factor and scales every UI element under that Canvas.

When Scale Factor is `1`, a Screen Size of `800 * 600` produces a Canvas Size of `800 * 600`.

![Scale Factor-1](/assets/media/migrated/blog/scale-factor-1-300x194-acfc33d204-w300.webp)
![Scale Factor-1-1](/assets/media/migrated/blog/scale-factor-1-1-300x225-da1cd3af68-w300.webp)

When Scale Factor is `2`, the same `800 * 600` screen produces a Canvas Size of `400 * 300`. The Canvas is then scaled by 2, so the visual result maps back to the screen size.

![Scale Factor-2](/assets/media/migrated/blog/scale-factor-2-300x190-f09f806616-w300.webp)
![Scale Factor-2-1](/assets/media/migrated/blog/scale-factor-2-1-300x224-551c2868f5-w300.webp)

### UI Scale Mode

#### Constant Pixel Size

Canvas Size always matches Screen Size. UI elements are scaled directly through Scale Factor.

#### ![](/assets/media/migrated/blog/constant-pixel-size-1-50fe88bac2-w446.webp)

1.  Scale Factor: scales every element under this Canvas.
2.  Reference Pixels Per Unit: maps Sprite pixels to UI units.

#####  ![Pixels Pre Unit-1](/assets/media/migrated/blog/pixels-pre-unit-1-4b14cd28a3-w558.webp)

The test image here is a `100 * 100` image.

#####  ![Test Image](/assets/media/migrated/blog/test-image-d72df588bc-w100.webp)

Suppose the scene contains a `1 * 1` Cube and a Sprite using the test image. Both have Transform Scale set to `1`.

When Pixels Per Unit is `100`, each Unity unit contains 100 pixels. The Sprite is `100 * 100` pixels, so its world size becomes `100 / 100 * 100 / 100 = 1 * 1` unit.

![Pixels Per Unit set to 100](/assets/media/migrated/blog/pixels-pre-unit-2-300x238-caf277af86-w300.webp)

Left: Cube. Right: Sprite.

When Pixels Per Unit is `10`, each Unity unit contains 10 pixels. The same Sprite becomes `100 / 10 * 100 / 10 = 10 * 10` units.

![Pixels Per Unit set to 10](/assets/media/migrated/blog/pixels-pre-unit-3-300x256-e9b3549c07-w300.webp)

Left: Cube. Right: Sprite.

Conclusion:

-   With the default setting, one Unity unit equals 100 pixels.
-   From this, we get the formula below.

> Sprite size in world coordinates = original image size (Pixels) / Pixels Per Unit

Back to Reference Pixels Per Unit. Unity's explanation is that if an image file has Pixels Per Unit set, Sprite pixels can be converted into UI pixels through this reference value.

**Image.cs**

```csharp
public float pixelsPerUnit
{
    get
    {
        float spritePixelsPerUnit = 100;
        if (sprite)
            spritePixelsPerUnit = sprite.pixelsPerUnit;

        float referencePixelsPerUnit = 100;
        if (canvas)
            referencePixelsPerUnit = canvas.referencePixelsPerUnit;

        return spritePixelsPerUnit / referencePixelsPerUnit;
    }
}
```

From Unity's code, `Image` calculates `pixelsPerUnit` as `spritePixelsPerUnit / referencePixelsPerUnit`.

**Image.cs**

```csharp
public override void SetNativeSize()
{
    if (overrideSprite != null)
    {
        float w = overrideSprite.rect.width / pixelsPerUnit;
        float h = overrideSprite.rect.height / pixelsPerUnit;
        rectTransform.anchorMax = rectTransform.anchorMin;
        rectTransform.sizeDelta = new Vector2(w, h);
        SetAllDirty();
    }
}
```

When setting the native size of an Image, Unity divides the Sprite width and height by `pixelsPerUnit`.

##### ![Reference Pixels Per Unit-1](/assets/media/migrated/blog/reference-pixels-per-unit-1-dbdee69035-w561.webp)

Create an Image under the Canvas, assign the test Sprite, and use the following settings.

##### ![Reference Pixels Per Unit-2](/assets/media/migrated/blog/reference-pixels-per-unit-2-5336c9e178-w562.webp)

Here are four tests. Change Reference Pixels Per Unit and Pixels Per Unit, then click `Set Native Size` on the Image component.

| Reference Pixels Per Unit | Pixels Per Unit | Image RectTransform (w * h) |
| --- | --- | --- |
| 100 | 100 | 100 * 100 |
| 200 | 100 | 200 * 200 |
| 100 | 10 | 1000 * 1000 |
| 200 | 10 | 2000 * 2000 |

-   The table shows that the default Image size changes with these values.
-   From this, we get the formula below.

> UI size = original image size (Pixels) / (Pixels Per Unit / Reference Pixels Per Unit)



#### Scale With Screen Size

This mode scales UI based on the Reference Resolution.

![](/assets/media/migrated/blog/scale-with-screen-size-1-1b88bc0c36-w446.webp)

-   Reference Resolution: the default design resolution.
-   Screen Match Mode: the scaling strategy.

First, look at Unity's algorithm.

**CanvasScaler.cs**

```csharp
Vector2 screenSize = new Vector2(Screen.width, Screen.height);

float scaleFactor = 0;
switch (m_ScreenMatchMode)
{
    case ScreenMatchMode.MatchWidthOrHeight:
    {
        // We take the log of the relative width and height before taking the average.
        // Then we transform it back in the original space.
        // the reason to transform in and out of logarithmic space is to have better behavior.
        // If one axis has twice resolution and the other has half, it should even out if widthOrHeight value is at 0.5.
        // In normal space the average would be (0.5 + 2) / 2 = 1.25
        // In logarithmic space the average is (-1 + 1) / 2 = 0
        float logWidth = Mathf.Log(screenSize.x / m_ReferenceResolution.x, kLogBase);
        float logHeight = Mathf.Log(screenSize.y / m_ReferenceResolution.y, kLogBase);
        float logWeightedAverage = Mathf.Lerp(logWidth, logHeight, m_MatchWidthOrHeight);
        scaleFactor = Mathf.Pow(kLogBase, logWeightedAverage);
        break;
    }
    case ScreenMatchMode.Expand:
    {
        scaleFactor = Mathf.Min(screenSize.x / m_ReferenceResolution.x, screenSize.y / m_ReferenceResolution.y);
        break;
    }
    case ScreenMatchMode.Shrink:
    {
        scaleFactor = Mathf.Max(screenSize.x / m_ReferenceResolution.x, screenSize.y / m_ReferenceResolution.y);
        break;
    }
}
```

#### Expand

Expand increases either the width or height of Canvas Size so the visible area is at least as large as the Reference Resolution.

```csharp
scaleFactor = Mathf.Min(screenSize.x / m_ReferenceResolution.x, screenSize.y / m_ReferenceResolution.y);
```

Unity calculates width and height ratios separately, then chooses the smaller value.

For example, Reference Resolution is `1280 * 720` and Screen Size is `800 * 600`.

-   ScaleFactor Width: `800 / 1280 = 0.625`
-   ScaleFactor Height: `600 / 720 = 0.83333`
-   Canvas Size = Screen Size / Scale Factor
-   Canvas Width: `800 / 0.625 = 1280`
-   Canvas Height: `600 / 0.625 = 960`

Canvas Size becomes `1280 * 960`. The height expands from `720` to `960`, which keeps all elements visible.

![](/assets/media/migrated/blog/expand-e65e8827ba-w1011.webp)

#### Shrink

Shrink reduces either the width or height of Canvas Size so it does not exceed the Reference Resolution.

```csharp
scaleFactor = Mathf.Max(screenSize.x / m_ReferenceResolution.x, screenSize.y / m_ReferenceResolution.y);
```

Using the same example, Unity chooses the larger ratio.

-   Reference Resolution: `1280 * 720`
-   Screen Size: `800 * 600`
-   ScaleFactor Width: `800 / 1280 = 0.625`
-   ScaleFactor Height: `600 / 720 = 0.83333`
-   Canvas Width: `800 / 0.83333 = 960`
-   Canvas Height: `600 / 0.83333 = 720`

Canvas Size becomes `960 * 720`. The width shrinks from `1280` to `960`.

![](/assets/media/migrated/blog/shrink-1-b227652bf5-w754.webp)

#### Match Width or Height

This mode blends scaling between width and height.

```csharp
float logWidth = Mathf.Log(screenSize.x / m_ReferenceResolution.x, kLogBase);
float logHeight = Mathf.Log(screenSize.y / m_ReferenceResolution.y, kLogBase);
float logWeightedAverage = Mathf.Lerp(logWidth, logHeight, m_MatchWidthOrHeight);
scaleFactor = Mathf.Pow(kLogBase, logWeightedAverage);
```

Unity takes the logarithm of the width and height scale factors before blending them. Why not just blend width and height directly? Compare the results.

Suppose Reference Resolution is `400 * 300` and Screen Size is `200 * 600`. Width is half of the reference, while height is double.

![](/assets/media/migrated/blog/match-width-or-height-1-eeca7778c8-w805.webp)

When Match is `0.5`, the expected ScaleFactor is `1`.

-   ScaleFactor Width: `200 / 400 = 0.5`
-   ScaleFactor Height: `600 / 300 = 2`

Linear blend:

ScaleFactor = Match \* ScaleFactor Width + Match \* ScaleFactorHeight

ScaleFactor = 0.5 \* 0.5 + 0.5 \* 2 = 1.25

Logarithmic blend:

logWidth: log2(0.5) = -1

logHeight: log2(2) = 1

logWeightedAverage: 0

ScaleFactor: 20 = 1

The linear blend gives `1.25`; the logarithmic blend gives `1`. The logarithmic approach better balances opposite scaling directions.



#### Constant Physical Size

This mode scales UI through the hardware device DPI.

![](/assets/media/migrated/blog/constant-physical-size-1-9b68ad8504-w446.webp)

1.  Physical Unit: the unit type used for scaling.
2.  Fallback Screen DPI: backup DPI used when the device DPI cannot be detected.
3.  Default Sprite DPI: default image DPI.

| Unit type | Unit | Relation to 1 inch |
| --- | --- | --- |
| Centimeters | cm | 2.54 |
| Millimeters | mm | 25.4 |
| Inches | in | 1 |
| Points | point | 72 |
| Picas | pica | 6 |

```csharp
float currentDpi = Screen.dpi;
float dpi = (currentDpi == 0 ? m_FallbackScreenDPI : currentDpi);
float targetDPI = 1;
switch (m_PhysicalUnit)
{
    case Unit.Centimeters: targetDPI = 2.54f; break;
    case Unit.Millimeters: targetDPI = 25.4f; break;
    case Unit.Inches:      targetDPI =     1; break;
    case Unit.Points:      targetDPI =    72; break;
    case Unit.Picas:       targetDPI =     6; break;
}

SetScaleFactor(dpi / targetDPI);
SetReferencePixelsPerUnit(m_ReferencePixelsPerUnit * targetDPI / m_DefaultSpriteDPI);
```

Conclusion:

-   ScaleFactor is the ratio between the current hardware DPI and the target unit.
-   ReferencePixelsPerUnit must be recalculated from the current DPI, then passed to Canvas. The formulas are below.

> New Reference Pixels Per Unit = Reference Pixels Per Unit \* Physical Unit / Default Sprite DPI

> UI size = original image size (Pixels) / (Pixels Per Unit / new Reference Pixels Per Unit)



### References

-   [Unity - Manual: Canvas](http://docs.unity3d.com/Manual/class-Canvas.html)
-   [Official UI source code](https://bitbucket.org/Unity-Technologies/ui)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
