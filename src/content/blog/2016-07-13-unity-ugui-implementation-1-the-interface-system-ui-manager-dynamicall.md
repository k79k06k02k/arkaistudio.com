---
title: "Unity UGUI Implementation (1): A UI Manager for Opening, Closing, Showing, and Hiding UI"
originalTitle: "Unity UGUI 實作篇 (一)：介面系統 UI Manager  動態開啟、關閉、顯示、隱藏 UI 介面"
description: "A practical Unity UGUI UI Manager example for opening, closing, showing, hiding, and organizing UI screens."
pubDate: "2016-07-13T00:15:49"
modDate: "2021-06-19T16:39:37"
legacyPath: "/blog/2016/07/13/unity-ugui-實作篇-一：介面系統-ui-manager-動態開啟、關閉、顯示"
legacySlug: "unity-ugui-實作篇-一：介面系統-ui-manager-動態開啟、關閉、顯示"
wpId: "753"
legacyAliases:
  - "/blog/753/"
  - "/blog/753/ugui/"
  - "/blog/753/ugui/unity-ugui-實作篇-一：介面系統-ui-manager-動態開啟、關閉、顯示/"
  - "/blog/753/unity/"
  - "/blog/753/unity/unity-ugui-實作篇-一：介面系統-ui-manager-動態開啟、關閉、顯示/"
categories:
  - "UGUI"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/07/13/unity-ugui-%e5%af%a6%e4%bd%9c%e7%af%87-%e4%b8%80%ef%bc%9a%e4%bb%8b%e9%9d%a2%e7%b3%bb%e7%b5%b1-ui-manager-%e5%8b%95%e6%85%8b%e9%96%8b%e5%95%9f%e3%80%81%e9%97%9c%e9%96%89%e3%80%81%e9%a1%af%e7%a4%ba/"
heroImage: "/assets/migrated/blog/unity-ugui--cf24b84529.png"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Other articles in this series

-   [Unity UGUI Implementation (1): A UI Manager for Opening, Closing, Showing, and Hiding UI](/blog/2016/07/13/unity-ugui-實作篇-一：介面系統-ui-manager-動態開啟、關閉、顯示/)
-   Unity UGUI Implementation (2): Scroll View implementation with dynamically created child elements
-   Unity UGUI Implementation (3): Building in-game tabs with UI Toggle
-   Unity UGUI Implementation (4): Displaying a 3D model in UI
-   Unity UGUI Implementation (5): Building health bars and value bars with UI Slider
-   Unity UGUI Implementation (6): Building in-game data sorting with UI Dropdown

### Environment

-   Windows 7
-   Unity 5.2.4

### Video tutorial

This tutorial is presented as a video. It was my first attempt at video-based teaching, so feedback was welcome. If this format worked, I planned to use it for the rest of the series.

<iframe loading="lazy" width="648" height="365" src="https://www.youtube.com/embed/-_jw6gkmgDg" allowfullscreen="" title="Embedded YouTube video"></iframe>

### Script

**UIManager.cs**

```csharp
using UnityEngine;
using System.Collections.Generic;

public class UIManager : Singleton<UIManager>
{
    private string UI_GAMEPANEL_ROOT = "Prefabs/GamePanel/";

    public GameObject m_CanvasRoot;

    public Dictionary<string, GameObject> m_PanelList = new Dictionary<string, GameObject>();



    private bool CheckCanvasRootIsNull()
    {
        if (m_CanvasRoot == null)
        {
            Debug.LogError("m_CanvasRoot is Null, Please in your Canvas add UIRootHandler.cs");
            return true;
        }
        else
        {
            return false;
        }
    }

    private bool IsPanelLive(string name)
    {
        return m_PanelList.ContainsKey(name);
    }

    public GameObject ShowPanel(string name)
    {
        if (CheckCanvasRootIsNull())
            return null;

        if (IsPanelLive(name))
        {
            Debug.LogErrorFormat("[{0}] is Showing, if you want to show, please close first!!", name);
            return null;
        }

        GameObject loadGo = Utility.AssetRelate.ResourcesLoadCheckNull<GameObject>(UI_GAMEPANEL_ROOT + name);
        if (loadGo == null)
            return null;


        GameObject panel = Utility.GameObjectRelate.InstantiateGameObject(m_CanvasRoot, loadGo);
        panel.name = name;


        m_PanelList.Add(name, panel);


        return panel;
    }

    public void TogglePanel(string name, bool isOn)
    {
        if (IsPanelLive(name))
        {
            if (m_PanelList[name] != null)
                m_PanelList[name].SetActive(isOn);
        }
        else
        {
            Debug.LogErrorFormat("TogglePanel [{0}] not found.", name);
        }
    }

    public void ClosePanel(string name)
    {
        if (IsPanelLive(name))
        {
            if (m_PanelList[name] != null)
                Object.Destroy(m_PanelList[name]);

            m_PanelList.Remove(name);
        }
        else
        {
            Debug.LogErrorFormat("ClosePanel [{0}] not found.", name);
        }
    }

    public void CloseAllPanel()
    {
        foreach (KeyValuePair<string, GameObject> item in m_PanelList)
        {
            if (item.Value != null)
                Object.Destroy(item.Value);
        }

        m_PanelList.Clear();
    }

    public Vector2 GetCanvasSize()
    {
        if (CheckCanvasRootIsNull())
            return Vector2.one * -1;

        RectTransform trans = m_CanvasRoot.transform as RectTransform;

        return trans.sizeDelta;
    }

}
```

**UIRootHandler.cs**

```csharp
using UnityEngine;

public class UIRootHandler : MonoBehaviour {
	void Awake () {
            UIManager.Instance.m_CanvasRoot = gameObject;
	}
}
```

### References

-   [Unity Hardware Statistics](http://hwstats.unity3d.com/)
-   [GitHub - Utility](https://github.com/k79k06k02k/Utility/)
-   [Unity UGUI Principles (1): Canvas Rendering Mode](/blog/2016/03/25/unity-ugui-原理篇-一：canvas/)
-   [Unity UGUI Principles (2): Canvas Scaler and UI Scaling](/blog/2016/03/28/unity-ugui-原理篇二：canvas-scaler-縮放核心/)

## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
