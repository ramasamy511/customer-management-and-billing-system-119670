#!/bin/bash
cd /home/kavia/workspace/code-generation/customer-management-and-billing-system-119670/frontend_react_js
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

