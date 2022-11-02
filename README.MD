# OracleApex-Checkbox_IR

Add CheckBox to ***Oracle APEX Interactive Report***.\
Values of CheckBoxes are aded to ***APEX COLLECTIONS***.

## Install

1. Add\
**OracleApex-Checkbox_IR.js**\
to your application.

2. Create Application Processes:

**ADD_ELEMENT_COLLECTION**

<p align="center">
  <img src="https://github.com/Ruslan-Shevyrev/MediaFilesToGitHub/blob/master/OracleApex-Checkbox_IR/media/1.%20OracleApex-Checkbox_IR.png" width="350" title="ADD_ELEMENT_COLLECTION">
</p>

:exclamation: **Point:** ***"On Load: After Footer (page template footer)"***

**Code:**
```
BEGIN
    IF apex_collection.collection_exists(apex_application.g_x02) <> TRUE THEN
		apex_collection.create_collection(p_collection_name => apex_application.g_x02);
    END IF;

	FOR c IN (SELECT SEQ_ID
				FROM apex_collections
				WHERE collection_name = apex_application.g_x02
				AND n001 = apex_application.g_x01)
    LOOP
        APEX_COLLECTION.DELETE_MEMBER (p_collection_name => apex_application.g_x02,
									   p_seq             => c.SEQ_ID);
    END LOOP;

    APEX_COLLECTION.ADD_MEMBER(
        p_collection_name => apex_application.g_x02,
        p_n001            => apex_application.g_x01);
		
	htp.p('200');
   
EXCEPTION WHEN OTHERS THEN
	htp.p(SQLERRM);
    ROLLBACK;
    htp.p('500');
END;
```

**DELETE_ELEMENT_COLLECTION**

<p align="center">
  <img src="https://github.com/Ruslan-Shevyrev/MediaFilesToGitHub/blob/master/OracleApex-Checkbox_IR/media/2.%20OracleApex-Checkbox_IR.png" width="350" title="DELETE_ELEMENT_COLLECTION">
</p>

:exclamation: **Point:** ***"On Load: After Footer (page template footer)"***

**Code:**
```
BEGIN
	FOR c IN (SELECT SEQ_ID
				FROM apex_collections
				WHERE collection_name = apex_application.g_x02
				AND n001 = apex_application.g_x01)
    LOOP
        APEX_COLLECTION.DELETE_MEMBER (p_collection_name => apex_application.g_x02,
									   p_seq             => c.SEQ_ID);
    END LOOP;

	htp.p('200');
EXCEPTION WHEN OTHERS THEN
	htp.p(SQLERRM);
    ROLLBACK;
    htp.p('500');
END;
```

## How to use

1. Create New ***Interactive Report*** with **APEX_ITEM.CHECKBOX** first column. 

:exclamation: ***CheckBox must be first column***

2. Connect your query with 

```
LEFT JOIN (SELECT n001 AS id
				FROM apex_collections
				WHERE collection_name = 'YOUR_COLLECTION_NAME') c
```

:exclamation: ***Change 'YOUR_COLLECTION_NAME' on your Collection Name***

***For Example:***

```
SELECT APEX_ITEM.CHECKBOX(p_idx  => 1,
                 		p_value => t.ID,
                 		p_item_id => t.ID,                  
                 		p_attributes    => CASE WHEN c.id IS NOT NULL THEN 
                 										'checked' 
                 									ELSE 
                 										NULL 
                 									END) AS check_box, 
    t.ID
    FROM (SELECT LEVEL AS id 
            FROM DUAL
            CONNECT BY LEVEL <= 10) t
    LEFT JOIN (SELECT n001 AS id
				FROM apex_collections
				WHERE collection_name = 'TEST_COLLECTION_NAME') c
    	ON t.id = c.id
    ORDER BY t.ID
```

3. Change **Type** of CheckBox Column to ***Percent Graph***

<p align="center">
  <img src="https://github.com/Ruslan-Shevyrev/MediaFilesToGitHub/blob/master/OracleApex-Checkbox_IR/media/3.%20OracleApex-Checkbox_IR.png" width="350" title="Type">
</p>

4. Add **Static id** for your ***Interactive Report*** 

***For Example: TestCheckBox***

<p align="center">
  <img src="https://github.com/Ruslan-Shevyrev/MediaFilesToGitHub/blob/master/OracleApex-Checkbox_IR/media/4.%20OracleApex-Checkbox_IR.png" width="350" title="StaticId">
</p>

5. Add **JavaScript** ***Execute when Page Load*** for your page:

```
	checkedAllcheckboxOfReport(reportId, collection);
```

***For Example:***

```
	checkedAllcheckboxOfReport('TestCheckBox', 'TEST_COLLECTION_NAME');
```

<p align="center">
  <img src="https://github.com/Ruslan-Shevyrev/MediaFilesToGitHub/blob/master/OracleApex-Checkbox_IR/media/5.%20OracleApex-Checkbox_IR.png" width="350" title="JavaScript">
</p>

5. If you need **Select All** CheckBox

<p align="center">
  <img src="https://github.com/Ruslan-Shevyrev/MediaFilesToGitHub/blob/master/OracleApex-Checkbox_IR/media/6.%20OracleApex-Checkbox_IR.png" width="350" title="JavaScript">
</p>

then add to **Heading** of your CheckBox Column

```
<input type="checkbox" class="checkAllReportCollection"></input>
```

<p align="center">
  <img src="https://github.com/Ruslan-Shevyrev/MediaFilesToGitHub/blob/master/OracleApex-Checkbox_IR/media/7.%20OracleApex-Checkbox_IR.png" width="350" title="JavaScript">
</p>

and ***Disable*** all the **Enable Users To**

<p align="center">
  <img src="https://github.com/Ruslan-Shevyrev/MediaFilesToGitHub/blob/master/OracleApex-Checkbox_IR/media/8.%20OracleApex-Checkbox_IR.png" width="350" title="JavaScript">
</p>

<table>
  <tr>
    <td valign="center" width="49%"><img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logo_mini.gif" title="logo"></td>
    <td valign="center" width="49%"><img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logoRS_FULL.png" title="RuslanShevyrev"></td>
  </tr>
</table>