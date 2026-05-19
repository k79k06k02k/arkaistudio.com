---
title: "Rapid Development Tips (2): Editing Multiple Objects Efficiently"
originalTitle: "快速開發小訣竅(二)：彈性修改多個物體"
description: "A Unity editor workflow for selecting many objects and applying repetitive UI or component changes without doing the same work by hand."
pubDate: "2016-07-08T02:35:56"
modDate: "2017-07-18T23:15:42"
legacyPath: "/blog/2016/07/08/快速開發小訣竅二：彈性修改多個物體"
legacySlug: "快速開發小訣竅二：彈性修改多個物體"
wpId: "731"
legacyAliases:
  - "/blog/731/"
  - "/blog/731/fast/"
  - "/blog/731/fast/快速開發小訣竅二：彈性修改多個物體/"
  - "/blog/731/unity/"
  - "/blog/731/unity/快速開發小訣竅二：彈性修改多個物體/"
categories:
  - "Fast"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/07/08/%e5%bf%ab%e9%80%9f%e9%96%8b%e7%99%bc%e5%b0%8f%e8%a8%a3%e7%ab%85%e4%ba%8c%ef%bc%9a%e5%bd%88%e6%80%a7%e4%bf%ae%e6%94%b9%e5%a4%9a%e5%80%8b%e7%89%a9%e9%ab%94/"
heroImage: "/assets/migrated/blog/2171e8f9b6-2171e8f9b6.png"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### In the middle and late stages of development, scenes and UI hierarchies accumulate a lot of objects. If you need to change button events, hierarchy structure, component settings, or added components across many objects, doing it manually is miserable and error-prone. Editor scripts can apply those changes consistently.



### Other articles in this series

-   [Rapid Development Tips (1): Automated Script Generation](/blog/2016/07/04/快速開發小訣竅一：script-自動化產出/)
-   [Rapid Development Tips (2): Editing Multiple Objects Efficiently](/blog/2016/07/08/快速開發小訣竅二：彈性修改多個物體/)



### Environment

-   Windows 7
-   Unity 5.2.4



### How to get objects in Scene?

1.  Use [Selection](https://docs.unity3d.com/ScriptReference/Selection.html) to get selected objects.
2.  Use [GameObject](https://docs.unity3d.com/ScriptReference/GameObject.html).FindXXX methods to search objects.
3.  Start from a specific object, then traverse its children and apply filtering rules.



### Implement it

Requirement, simplified for the example:

1.  Find the child object named `Player`.
2.  Set the Player's Collider `enabled` value to `false`.
3.  Add a child object under Player.
4.  Name the new child object `Player Child`.

Start with this hierarchy:

![Demand\_01](/assets/migrated/blog/demand_01-54e1143efa.png)

Implement an editor script.

#### Method A: use Selection

**ModifyBySelect.cs**

```csharp
using UnityEngine;
using UnityEditor;

public class ModifyBySelect
{
    [MenuItem("Modify/ModifyBySelect")]
    public static void BySelect()
    {
        if (Selection.activeGameObject != null)
            Modify(Selection.activeGameObject.transform);
    }

    static void Modify(Transform parent)
    {
        Transform trans = null;

        for (int i = 0; i < parent.childCount; i++)
        {
            trans = parent.GetChild(i);

            if (trans.childCount > 0)
                Modify(trans);


            if (trans.name == "Player")
            {
                trans.GetComponent<BoxCollider>().enabled = false;

                GameObject go = new GameObject("Player Child");
                go.transform.SetParent(trans);

                Debug.Log(trans);
            }
        }
    }
}
```

Line 6: Add a Unity menu item.

Line 10: Get the selected object in the current Scene.

Line 19: Iterate child objects.

Lines 21-22: If the child has children, recurse.

Line 25: Check the GameObject name.

Line 27: Disable BoxCollider.

Lines 29-30: Create the child object and set its parent.

#### Method B: use GameObject.FindXXX

**ModifyByFind.cs**

```csharp
using UnityEngine;
using UnityEditor;

public class ModifyByFind
{
    [MenuItem("Modify/ModifyByFind")]
    public static void ByFind()
    {
        Modify(GameObject.FindObjectsOfType<Transform>());
    }

    static void Modify(Transform[] trans)
    {
        for (int i = 0; i < trans.Length; i++)
        {
            if (trans[i].name == "Player")
            {
                trans[i].GetComponent<BoxCollider>().enabled = false;

                GameObject go = new GameObject("Player Child");
                go.transform.SetParent(trans[i]);

                Debug.Log(trans[i]);
            }
        }

    }
}
```

Line 6: Add a Unity menu item.

Line 9: Find all Transform objects in the Scene.

Line 16: Check the GameObject name.

Line 18: Disable BoxCollider.

Lines 20-21: Create the child object and set its parent.

Run the menu item.

![Demand\_03](/assets/migrated/blog/demand_03-e486d3b012.png)

Result:

![Demand\_02](/assets/migrated/blog/demand_02-45284ebb74.png)

### Postscript

Editor scripts let us modify many objects without hand-selecting and hand-editing each one. For repeated project-specific work, this can grow into dedicated EditorWindow tools.

### References

-   [Unity - Scripting API: GameObject](https://docs.unity3d.com/ScriptReference/GameObject.html)
-   [Unity - Scripting API: Selection](https://docs.unity3d.com/ScriptReference/Selection.html)
-   [Unity - Scripting API: EditorWindow](https://docs.unity3d.com/ScriptReference/EditorWindow.html)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
