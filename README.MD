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

<table>
  <tr>
    <td valign="center" width="49%"><img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logo_mini.gif" title="logo"></td>
    <td valign="center" width="49%"><img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logoRS_FULL.png" title="RuslanShevyrev"></td>
  </tr>
</table>