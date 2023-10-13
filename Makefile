deploy:
	if [ -z "$$BB_STORAGE_ACCOUNT" ]; then \
		echo "Error: BB_STORAGE_ACCOUNT is not defined."; \
		exit 1; \
	fi

	# npm run format
	# [ $$? -eq 0 ] || exit 1

	# npm test
	# [ $$? -eq 0 ] || exit 1
    
	az storage blob upload-batch --destination '$$web' --source www --account-name $${BB_STORAGE_ACCOUNT} --overwrite
    
.PHONY: deploy
