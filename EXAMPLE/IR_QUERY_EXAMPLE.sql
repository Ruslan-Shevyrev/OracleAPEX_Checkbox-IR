SELECT APEX_ITEM.CHECKBOX(p_idx			=> 1,
						p_value			=> t.ID,
						p_item_id		=> t.ID,
						p_attributes	=> CASE WHEN c.id IS NOT NULL THEN
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
    ORDER BY t.ID;