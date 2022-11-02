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