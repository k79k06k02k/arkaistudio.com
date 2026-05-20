---
title: "Unity UGUI Principles (4): EventSystem, Events, and Input"
originalTitle: "Unity UGUI 原理篇(四)：Event System Manager 事件與觸發"
description: "A Unity UGUI note covering EventSystem, input modules, raycasters, event interfaces, and the flow behind UI interaction."
pubDate: "2016-05-19T15:27:44"
modDate: "2017-09-29T10:09:52"
legacyPath: "/blog/2016/05/19/unity-ugui-原理篇四：event-system-manager-事件與觸發"
legacySlug: "unity-ugui-原理篇四：event-system-manager-事件與觸發"
wpId: "440"
legacyAliases:
  - "/blog/440/"
  - "/blog/440/ugui/"
  - "/blog/440/ugui/unity-ugui-原理篇四：event-system-manager-事件與觸發/"
  - "/blog/440/unity/"
  - "/blog/440/unity/unity-ugui-原理篇四：event-system-manager-事件與觸發/"
categories:
  - "UGUI"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/05/19/unity-ugui-%e5%8e%9f%e7%90%86%e7%af%87%e5%9b%9b%ef%bc%9aevent-system-manager-%e4%ba%8b%e4%bb%b6%e8%88%87%e8%a7%b8%e7%99%bc/"
heroImage: "/assets/media/migrated/blog/special-1-a9491c6460-w750.webp"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Goal

-   EventSystem
-   Input Modules
-   Graphic Raycaster
-   Physics Raycaster and Physics 2D Raycaster



### Other articles in this series

-   [Unity UGUI Principles (1): Canvas Rendering Mode](/blog/2016/03/25/unity-ugui-原理篇-一：canvas/)
-   [Unity UGUI Principles (2): Canvas Scaler and UI Scaling](/blog/2016/03/28/unity-ugui-原理篇二：canvas-scaler-縮放核心/)
-   [Unity UGUI Principles (3): RectTransform](/blog/2016/05/02/unity-ugui-原理篇三：recttransform/)
-   [Unity UGUI Principles (4): EventSystem, Events, and Input](/blog/2016/05/19/unity-ugui-原理篇四：event-system-manager-事件與觸發/)
-   [Unity UGUI Principles (5): Auto Layout](/blog/2016/06/19/unity-ugui-原理篇五：auto-layout-自動佈局/)



### Environment

-   Windows 7
-   Unity 5.2.4



### [Event System](http://docs.unity3d.com/Manual/EventSystem.html)

When you create UI, Unity automatically creates an EventSystem object. It receives mouse, touch, and keyboard input, then dispatches events to the target objects. The default object contains [EventSystem](http://docs.unity3d.com/Manual/script-EventSystem.html), [Standalone Input Module](http://docs.unity3d.com/Manual/script-StandaloneInputModule.html), and [Touch Input Module](http://docs.unity3d.com/Manual/script-TouchInputModule.html).

![](/assets/media/migrated/blog/event-system_02-ce4c9759d8-w453.webp)

### [Event System Manager](http://docs.unity3d.com/Manual/script-EventSystem.html)

#### ![](/assets/media/migrated/blog/event-system_03-f16d6244fb-w452.webp)

EventSystem coordinates input modules and the currently selected object. On every `Update`, it receives input module calls and decides which module should process the current input.

#### Event System Info

After pressing Play, select the EventSystem object. The Inspector shows the selected object, pointer position, event camera, and related event state.

![](/assets/media/migrated/blog/event-system_04-9d4b7e92c0-w452.webp)

#### First Selected

The object selected when execution starts. For example, if this points to an InputField, the cursor focuses that InputField after Play starts.

#### Send Navigation Events

Controls whether UI navigation is enabled. Navigation uses keyboard directions plus Cancel (`Esc`) and Submit (`Enter`). If a screen has several menu buttons, [Navigation Options](http://docs.unity3d.com/Manual/script-SelectableNavigation.html) can explicitly define which object should be selected when the player presses each direction.

#### ![](/assets/media/migrated/blog/event-system_05-a6943ff25c-w436.webp)

`Visualize` draws yellow lines showing the configured navigation links.

#### ![Event System\_06](/assets/media/migrated/blog/event-system_06-1f2cea1a18-w454.webp)

#### Drag Threshold

Drag event sensitivity. Lower values make drag detection more sensitive.

### [Standalone Input Module](http://docs.unity3d.com/Manual/script-StandaloneInputModule.html)

![](/assets/media/migrated/blog/event-system_07-f64c7fd9b4-w453.webp)

Standalone Input Module handles desktop input, mainly mouse and keyboard. It uses Raycasters in the Scene to determine which element has been clicked, then dispatches the corresponding event.

#### Horizontal Axis

Represents the Horizontal Axis configured in [Input Manager](http://docs.unity3d.com/Manual/class-InputManager.html). Vertical Axis, Submit Button, and Cancel Button follow the same idea.

#### Input Actions Per Second

Maximum number of button and mouse input actions per second.

#### Repeat Delay

Delay before repeated input begins.

#### Complete event execution process

Keyboard input:

1.  Move Event: reads axis input for left, right, up, and down through Input Manager, then sends it to the selected object.
2.  Submit and Cancel Button: when an object is pressed, Input Manager checks Submit and Cancel input and passes those events to the selected object.

Mouse input:

1.  New press:
    -   Send PointerEnter.
    -   Send PointerPress.
    -   Store drag-related state.
    -   Send BeginDrag.
    -   Set the pressed object as the selected object in EventSystem.
2.  Held press / drag:
    -   Process movement.
    -   Send Drag.
    -   Process PointerEnter and PointerExit when dragging across objects.
3.  Release:
    -   Send PointerUp.
    -   If the mouse is released on the pressed object, send PointerClick.
    -   If drag state exists, send Drop.
    -   Send EndDrag.
4.  Mouse wheel:
    -   Send Scroll.

### [Touch Input Module](http://docs.unity3d.com/Manual/script-TouchInputModule.html)

![Event System\_08](/assets/media/migrated/blog/event-system_08-69084be8bb-w451.webp)

Touch Input Module is mainly used on mobile devices. It responds to touch and drag input, then uses Raycasters in the Scene to determine the target element and dispatch events. Its process is similar to mouse input in Standalone Input Module; treat a mouse click as a touch for the mental model.

### Event System trigger process

1.  User input: mouse, touch, or keyboard.
2.  EventSystem decides whether Standalone Input Module or Touch Input Module should handle the input.
3.  The selected Input Module uses Raycasters in the Scene to calculate which element was hit.
4.  EventSystem sends the event.



### [Graphic Raycaster](http://docs.unity3d.com/Manual/script-GraphicRaycaster.html)

Component path: `Component -> Event -> Graphic Raycaster`.

![](/assets/media/migrated/blog/graphicraycaster_01-a7cb0ee17e-w456.webp)

Graphic Raycaster observes graphics under a Canvas and checks whether the pointer hits them. A raycast projects an invisible line from a position in a direction, then checks what it intersects. Unity already has a [raycasting explanation](https://unity3d.com/learn/tutorials/modules/beginner/physics/raycasting); here it is used to detect UI hits.

#### Ignore Reversed Graphics

Controls whether raycasts ignore graphics facing away from the screen. For example, if a Graphic is rotated 180 degrees on the Y-axis and its back faces the screen, checking this option makes the raycast ignore it.

#### Blocked Objects and Blocking Mask

These settings matter mainly when Canvas Render Mode uses World Space or Screen Space - Camera. A 3D or 2D object in front of the UI can block the ray before it reaches UI graphics.

-   Blocked Objects: object types that can block the ray.
-   Blocking Mask: layers that can block the ray.

For example, if a Button overlaps a Cube and no blocking is configured, clicking the overlap still triggers the Button.

#### ![GraphicRaycaster\_02](/assets/media/migrated/blog/graphicraycaster_02-5f1241458d-animated.webp)

If the Cube's Layer is changed to `Test01`, Blocked Objects is set to `Three D`, and Blocking Mask only includes `Test01`, the Cube blocks the ray. The Button no longer receives the event.

#### ![GraphicRaycaster\_03](/assets/media/migrated/blog/graphicraycaster_03-d01b559b12-animated.webp)



### [Physics Raycaster (Physics Raycaster)](http://docs.unity3d.com/Manual/script-PhysicsRaycaster.html)

Component path: `Component -> Event -> Physics Raycaster`.

Physics Raycaster uses a Camera to detect 3D GameObjects in the Scene. The target must have a [Collider component](http://docs.unity3d.com/Manual/CollidersOverview.html). Objects that implement Event Interfaces can then receive event messages, such as click or drag. See Unity's [supported events](http://docs.unity3d.com/Manual/SupportedEvents.html) for the full list.

Example setup:

1.  Create an EventSystem: `GameObject -> UI -> EventSystem`.
2.  Add a Physics Raycaster component to the Camera.

#### ![](/assets/media/migrated/blog/physics-raycaster_01-66a892e6d9-w454.webp)

3.  Implement the Event Interface. There are two approaches: implement the interface directly in a script, or use [Event Trigger Component](http://docs.unity3d.com/Manual/script-EventTrigger.html).

First approach: create a script that directly implements the interface.

**EventTest.cs**

```csharp
using UnityEngine;
using UnityEngine.EventSystems;

public class EventTest : MonoBehaviour, IPointerDownHandler
{
    public void OnPointerDown(PointerEventData eventData)
    {
        print(gameObject.name);
    }
}
```

Line 2: import the `UnityEngine.EventSystems` namespace.

Line 4: implement an Event Interface. This example uses `IPointerDownHandler` for click events. See Unity's [supported events](http://docs.unity3d.com/Manual/SupportedEvents.html).

Lines 6-8: implement the handler and receive [PointerEventData](http://docs.unity3d.com/ScriptReference/EventSystems.PointerEventData.html).

Create a 3D object, named `Cube` here, and add a BoxCollider component.

![](/assets/media/migrated/blog/physics-raycaster_02-8e969ffd3c-w450.webp)

Add the script to the Cube. The Inspector shows the events intercepted by the component.

#### ![](/assets/media/migrated/blog/physics-raycaster_03-4e317ebf1d-w450.webp)

Clicking the Cube now calls `OnPointerDown` and passes in event data.

Second approach: use Event Trigger Component.

Create a script with methods that can receive Event Trigger notifications.

**EventTriggerTest.cs**

```csharp
using UnityEngine;
using UnityEngine.EventSystems;

public class EventTriggerTest : MonoBehaviour
{
    // Pass event information through BaseEventData.
    public void OnPointerDown(BaseEventData eventData)
    {
        print("OnPointerDown--BaseEventData");
    }

    // Invoke without parameters.
    public void OnPointerDown()
    {
        print("OnPointerDown--non");
    }

    // Pass an int parameter.
    public void OnPointerDown(int i)
    {
        print("OnPointerDown--int");
    }
}
```

Line 2: import the `UnityEngine.EventSystems` namespace.

Lines 6-18: define three method signatures that can be called from Event Trigger.

Create a 3D object, named `Cube` here, and add a BoxCollider component.

![](/assets/media/migrated/blog/physics-raycaster_04-2db2bc6743-w450.webp)

Add the script to the Cube, then add an [Event Trigger component](http://docs.unity3d.com/Manual/script-EventTrigger.html). Event Trigger receives events from EventSystem and calls configured methods.

Component path: `Component -> Event -> Event Trigger`.

Click `Add New Event Type` and choose the event type. This example uses `PointerDown`.

![](/assets/media/migrated/blog/physics-raycaster_05-ab771fbb2f-w566.webp)

Unity then adds a UnityEvent entry. UnityEvents let you configure, through the editor, which methods or properties should be called when an event fires.

[Talk Nonsense and Write Whatever You Want: UnityEngine.Events](http://godstamps.blogspot.tw/2015/10/unity-unityengineevents.html)

[Unity - Manual: UnityEvents](http://docs.unity3d.com/Manual/UnityEvents.html)

After clicking the `+` button, drag in the Scene GameObject that should receive the notification. UnityEvent lists public methods and properties on that GameObject, so you can assign notification methods or preconfigured property changes.

Drag the GameObject into the Cube Event Trigger and assign the three script methods.

![Physics Raycaster\_06](/assets/media/migrated/blog/physics-raycaster_06-d179d71392-w452.webp)

Clicking the Cube now triggers `PointerDown` and calls the three configured methods.

Implementation notes:

-   The Scene needs an [EventSystem](http://docs.unity3d.com/Manual/EventSystem.html) GameObject.
-   The Camera needs a [Physics Raycaster component](http://docs.unity3d.com/Manual/script-PhysicsRaycaster.html).
-   The 3D GameObject needs a [Collider component](http://docs.unity3d.com/Manual/CollidersOverview.html).
-   You can either implement Event Interfaces directly in a script or configure them through Event Trigger. Event Trigger is more flexible when designers need to assign notification methods or property changes in the editor.



### Physics 2D Raycaster

Component path: `Component -> Event -> Physics 2D Raycaster`.

Physics 2D Raycaster works like Physics Raycaster, but it detects 2D GameObjects. The target object must have a [Collider2D component](http://docs.unity3d.com/Manual/Collider2D.html).

### Postscript

Once you understand how input modules and raycasters work together, the EventSystem becomes much less mysterious. The same event flow can be applied to UI, 3D objects, and 2D objects, which makes interaction code cleaner and faster to build.

### References

-   [Unity - Manual: Event System](http://docs.unity3d.com/Manual/EventSystem.html)
-   [Unity - Manual: UnityEvents](http://docs.unity3d.com/Manual/UnityEvents.html)
-   [Unity - Raycasting](http://unity3d.com/cn/learn/tutorials/modules/beginner/physics/raycasting)
-   [Talk Nonsense and Write Whatever You Want: UnityEngine.Events](http://godstamps.blogspot.tw/2015/10/unity-unityengineevents.html)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
