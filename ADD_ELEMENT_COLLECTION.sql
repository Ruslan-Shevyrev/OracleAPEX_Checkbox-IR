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