---
title: "Rapid Development Tips (1): Automated Script Generation"
originalTitle: "快速開發小訣竅(一)：Script 自動化產出"
description: "A Unity editor workflow for generating repetitive script templates once a project's coding conventions are stable."
pubDate: "2016-07-04T15:36:41"
modDate: "2017-07-18T23:08:34"
legacyPath: "/blog/2016/07/04/快速開發小訣竅一：script-自動化產出"
legacySlug: "快速開發小訣竅一：script-自動化產出"
wpId: "701"
legacyAliases:
  - "/blog/701/"
  - "/blog/701/fast/"
  - "/blog/701/fast/快速開發小訣竅一：script-自動化產出/"
  - "/blog/701/unity/"
  - "/blog/701/unity/快速開發小訣竅一：script-自動化產出/"
categories:
  - "Fast"
  - "Unity"
tags:
  []
sourceUrl: "https://www.arkaistudio.com/blog/2016/07/04/%e5%bf%ab%e9%80%9f%e9%96%8b%e7%99%bc%e5%b0%8f%e8%a8%a3%e7%ab%85%e4%b8%80%ef%bc%9ascript-%e8%87%aa%e5%8b%95%e5%8c%96%e7%94%a2%e5%87%ba/"
heroImage: "/assets/media/migrated/blog/2171e8f9b6-2171e8f9b6-w750.webp"
draft: false
---

<!-- Migrated from WordPress. Legacy metadata is retained for URL compatibility. -->

### Once a project has stable development conventions, some code becomes repetitive with only small differences. Writing that by hand every time is boring and inefficient. A small script generator can produce those files automatically and let the team focus on the parts that actually need thought.



### Other articles in this series

-   [Rapid Development Tips (1): Automated Script Generation](/blog/2016/07/04/快速開發小訣竅一：script-自動化產出/)
-   [Rapid Development Tips (2): Editing Multiple Objects Efficiently](/blog/2016/07/08/快速開發小訣竅二：彈性修改多個物體/)



### Environment

-   Windows 7
-   Unity 5.2.4



### Implementation principle

1.  Create a plain-text template and mark replaceable keys inside it.

**TableClass.txt**

```csharp
using UnityEngine;
using System.Collections;

[System.Serializable]
public class $ClassName
{
$MemberFields
}
```

2.  Replace those keys with generated content and write the output file.

### Implementation

First create folders for the generator.

### ![Folder\_01](/assets/media/migrated/blog/folder_01-589ff104b3-w166.webp)

-   `Editor`: generator control script.
-   `GenerateFile`: generated scripts.
-   `Templates`: plain-text templates.

Create a plain-text template named `TableClass.txt` and place it in the `Templates` folder.

**TableClass.txt**

```csharp
using UnityEngine;
using System.Collections;

[System.Serializable]
public class $ClassName
{
$MemberFields
}
```

Create the control script, `AutoGenerate.cs`, and place it in the `Editor` folder.

**AutoGenerate.cs**

```csharp
using UnityEngine;
using System.Collections;
using System.IO;
using UnityEditor;
using System.Text;

public class AutoGenerate
{
    static string[] NAME = new string[] { "PlayerData", "EnemyData", "FriendData" };

    [MenuItem("AutoGenerate/Generate")]
    public static void Generate()
    {
        for (int i = 0; i < NAME.Length; i++)
            Generate(NAME[i]);
    }

    static void Generate(string name)
    {
        TextAsset textAsset = AssetDatabase.LoadAssetAtPath<TextAsset>("Assets/AutoScripts/Templates/TableClass.txt");
        string template = textAsset.ToString();


        StringBuilder sb = new StringBuilder();
        sb.Append("public int hp { get; set; }" + "\n");
        sb.Append("public int mp { get; set; }" + "\n");
        sb.Append("public int attack { get; set; }");

        template = template.Replace("$ClassName", name);
        template = template.Replace("$MemberFields", sb.ToString());

        using (var writer = new StreamWriter("Assets/AutoScripts/GenerateFile/" + name + ".cs"))
        {
            writer.Write(template);
            writer.Close();
        }

        AssetDatabase.Refresh();
    }
}
```

Line 9: Declare the class names to generate.

Line 11: Add a Unity menu item.

Lines 12-16: Call the generation method.

Line 20: Read the template.

Lines 24-27: Generate the script content. This example uses the same fields for teaching, but real projects can generate different content based on project needs.

Lines 29-30: Replace keys in the template.

Lines 32-36: Write the generated file.

Run it from `AutoGenerate -> Generate`.

### ![Menu\_01](/assets/media/migrated/blog/menu_01-91756146d9-w547.webp)

The generated scripts appear in the `GenerateFile` folder.

![GenerateFile\_01](/assets/media/migrated/blog/generatefile_01-1da4a8858a-w430.webp)

* * *



### **2016/07/27 Supplement**

Unity also released an editor extension for script creation. It supports different script layouts, names, and implementation patterns.

#### Create Script Dialog

Required version: Unity 3.4.2 or later.

[![icon\_unity asset store](/assets/media/migrated/blog/icon_unity-asset-store-a615699422-w212.webp)](https://www.assetstore.unity3d.com/en/#!/content/2668)

### Postscript

Automatic generation is useful whenever the output is repetitive and structured: scripts, shaders, text files, reports, configuration files, and so on. Laziness is not the problem here; doing identical work by hand is.

## Attribution

Please credit ARKAI Studio and link back to this article when quoting or reposting.
