---
title: "An Engineer's Toolbox (2): Singleton and Debug Filtering"
originalTitle: "屬於工程師的專用工具箱(二)：常用工具(Singleton、Debug過濾器)"
description: "A practical Unity note on using Singleton helpers for shared data and Debug filtering to keep release builds clean."
pubDate: "2016-03-25T02:12:38"
modDate: "2017-07-18T17:47:17"
legacyPath: "/blog/2016/03/25/屬於工程師的專用工具箱二：常用工具singleton、debug過濾"
legacySlug: "屬於工程師的專用工具箱二：常用工具singleton、debug過濾"
wpId: "175"
legacyAliases:
  - "/blog/175/"
  - "/blog/175/tool/"
  - "/blog/175/tool/屬於工程師的專用工具箱二：常用工具singleton、debug過濾/"
  - "/blog/175/unity/"
  - "/blog/175/unity/屬於工程師的專用工具箱二：常用工具singleton、debug過濾/"
categories:
  - "Tool"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/03/25/%e5%b1%ac%e6%96%bc%e5%b7%a5%e7%a8%8b%e5%b8%ab%e7%9a%84%e5%b0%88%e7%94%a8%e5%b7%a5%e5%85%b7%e7%ae%b1%e4%ba%8c%ef%bc%9a%e5%b8%b8%e7%94%a8%e5%b7%a5%e5%85%b7singleton%e3%80%81debug%e9%81%8e%e6%bf%be/"
heroImage: "/assets/migrated/blog/special-2-8a969f23c2.png"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### This note covers two small but useful Unity helpers: a Singleton base class and a Debug filter. Singleton gives scripts a simple way to share data or services. Debug filtering keeps development logs from leaking into release builds, where they add noise and cost performance.



### Other articles in this series

-   [An Engineer's Toolbox (1): Utility.cs Convenience Helpers](/blog/2016/03/25/屬於工程師的專用工具箱一：便捷工具類別utility-cs/)
-   [An Engineer's Toolbox (2): Singleton and Debug Filtering](/blog/2016/03/25/屬於工程師的專用工具箱二：常用工具singleton、debug過濾/)
-   [An Engineer's Toolbox (3): Unity Editor Tools](/blog/2016/04/26/屬於工程師的專用工具箱三：編輯工具editor-tools/)
-   [An Engineer's Toolbox (4): Recommended Free Unity Plugins](/blog/2016/05/02/屬於工程師的專用工具箱四：推薦-plugin-免費篇/)



### Singleton

Games almost always have shared data or services that multiple scripts need to read and update. A Singleton is one common way to centralize that access. In simple terms, it keeps one shared instance available through a static entry point.

#### Singleton tool

**Singleton.cs**

```csharp
/**********************************************************
// Author   : K.(k79k06k02k)
// FileName : Singleton.cs
// Reference: http://wiki.unity3d.com/index.php/Singleton
**********************************************************/

public class Singleton<T> where T : class,new()
{
    private static T _instance;

    private static object _lock = new object();

    public static T Instance
    {
        get
        {

            lock (_lock)
            {
                if (_instance == null)
                {
                    _instance = new T();
                }

                return _instance;
            }
        }
    }
}
```

Implementation method: inherit from the generic class.

**TestClass.cs**

```csharp
using UnityEngine;

public class TestClass : Singleton<TestClass>
{
    public void Hello()
    {
        Debug.Log("Hello");
    }
}
```

Call it like this:

```csharp
TestClass.Instance.Hello();
```



#### Singleton tool (inherited from MonoBehaviour version)

**SingletonObject.cs**

```csharp
/**********************************************************
// Author   : K.(k79k06k02k)
// FileName : SingletonObject.cs
// Reference: http://wiki.unity3d.com/index.php/Singleton
**********************************************************/
using UnityEngine;

public class SingletonObject<T> : MonoBehaviour where T : MonoBehaviour
{
	private static T _instance;

	private static object _lock = new object();

	public static T Instance
	{
		get
		{

			if (applicationIsQuitting) {
				Debug.LogWarning("[Singleton] Instance '"+ typeof(T) +
					"' already destroyed on application quit." +
					" Won't create again - returning null.");
				return null;
			}


            lock (_lock)
			{
				if (_instance == null)
				{
					_instance = (T) FindObjectOfType(typeof(T));


					if ( FindObjectsOfType(typeof(T)).Length > 1 )
					{
						Debug.LogError("[Singleton] Something went really wrong " +
							" - there should never be more than 1 singleton!" +
							" Reopenning the scene might fix it.");
						return _instance;
					}

					if (_instance == null)
					{
						GameObject singleton = new GameObject();
						_instance = singleton.AddComponent<T>();
						singleton.name = "(singleton) "+ typeof(T).ToString();


						DontDestroyOnLoad(singleton);

						Debug.Log("[Singleton] An instance of " + typeof(T) +
							" is needed in the scene, so '" + singleton +
							"' was created with DontDestroyOnLoad.");
					} else {
						Debug.Log("[Singleton] Using instance already created: " +
							_instance.gameObject.name);
					}
				}

				return _instance;
			}
		}
	}

	private static bool applicationIsQuitting = false;

	public void OnDestroy () {
		applicationIsQuitting = true;
	}
}
```

#### When to use it

For pure data or service access, such as Resources loading or game table data, use `Singleton.cs`. It does not need `MonoBehaviour`, so it avoids unnecessary component overhead.

### Debug Filter

During development, `Debug.Log` ends up everywhere. Removing or disabling those calls one by one before release is a waste of time, so it is better to control them through code.

**TestClass.cs**

```csharp
public class TestClass
{
    public static void Log(object message)
    {
#if Debug
        Debug.Log(message);
#endif
    }
}
```

#### Usage

1.  Call this method anywhere you want to print a debug message.
2.  Add the `Debug` symbol under `File -> Build Settings -> Player Settings -> Other Settings -> Scripting Define Symbols`.



#### Problem

This does remove logs from release builds, but it introduces another annoyance. When you double-click a Unity Console message, Unity jumps to the centralized wrapper method instead of the real call site. You then have to inspect the stack trace to find the useful line.

#### Improvement

One workaround is to define your own `Debug` class and use `Conditional` attributes. The example below follows the approach from [Matt's God Worship Record: Turn off Unity3D Debug.Log](http://liangyenchen.blogspot.tw/2015/09/unity3d-debuglog.html).

#### DebugFilterTools

**DebugFilter.cs**

```csharp
/**********************************************************
// Author   : K.(k79k06k02k)
// FileName : DebugFilter.cs
// Reference: http://liangyenchen.blogspot.tw/2015/09/unity3d-debuglog.html
**********************************************************/
#if DEBUG_FILTER

using System.Diagnostics;
using UnityEngine;

public static class Debug
{
    [Conditional("DEBUG_FILTER")]
    public static void Break() { }
    [Conditional("DEBUG_FILTER")]
    public static void ClearDeveloperConsole() { }
    [Conditional("DEBUG_FILTER")]
    public static void DebugBreak() { }

    [Conditional("DEBUG_FILTER")]
    public static void DrawLine(Vector3 start, Vector3 end) { }
    [Conditional("DEBUG_FILTER")]
    public static void DrawLine(Vector3 start, Vector3 end, Color color) { }
    [Conditional("DEBUG_FILTER")]
    public static void DrawLine(Vector3 start, Vector3 end, Color color, float duration) { }
    [Conditional("DEBUG_FILTER")]
    public static void DrawLine(Vector3 start, Vector3 end, Color color, float duration, bool depthTest) { }

    [Conditional("DEBUG_FILTER")]
    public static void DrawRay(Vector3 start, Vector3 dir) { }
    [Conditional("DEBUG_FILTER")]
    public static void DrawRay(Vector3 start, Vector3 dir, Color color) { }
    [Conditional("DEBUG_FILTER")]
    public static void DrawRay(Vector3 start, Vector3 dir, Color color, float duration) { }
    [Conditional("DEBUG_FILTER")]
    public static void DrawRay(Vector3 start, Vector3 dir, Color color, float duration, bool depthTest) { }

    [Conditional("DEBUG_FILTER")]
    public static void Log(object message) { }
    [Conditional("DEBUG_FILTER")]
    public static void Log(object message, Object context) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogFormat(string format, params object[] args) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogFormat(Object context, string format, params object[] args) { }

    [Conditional("DEBUG_FILTER")]
    public static void LogWarning(object message) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogWarning(object message, Object context) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogWarningFormat(string format, params object[] args) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogWarningFormat(Object context, string format, params object[] args) { }

    [Conditional("DEBUG_FILTER")]
    public static void LogError(object message) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogError(object message, Object context) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogErrorFormat(string format, params object[] args) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogErrorFormat(Object context, string format, params object[] args) { }

    [Conditional("DEBUG_FILTER")]
    public static void LogException(System.Exception exception) { }
    [Conditional("DEBUG_FILTER")]
    public static void LogException(System.Exception exception, Object context) { }
}
#endif
```

#### Usage

Add the `DEBUG_FILTER` symbol under `File -> Build Settings -> Player Settings -> Other Settings -> Scripting Define Symbols`. Without the symbol, the debug calls are excluded.

### Postscript

These Singleton and DebugFilter helpers are small, but they remove repeated friction during development. The same pattern can be adapted to your own production needs.

### References

-   [Unity Wiki Singleton](http://wiki.unity3d.com/index.php/Singleton)
-   [Matt's God Worship Record: Turn off Unity3D Debug.Log](http://liangyenchen.blogspot.tw/2015/09/unity3d-debuglog.html)
-   [MSDN Conditional](https://msdn.microsoft.com/zh-tw/library/4xssyw96\(v=vs.90\).aspx)



## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
