package ca.brij.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca.brij.bean.notification.Notification;
import ca.brij.dao.notification.NotificationDao;

@RestController
public class NotificationController {

	
	@Autowired
	private NotificationDao notificationDao;
	
	/**
	 * Find By User
	 * @throws Exception 
	 */
	@RequestMapping(value = "/admin/notification/findAll", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Notification> getAllNotifications() throws Exception {
		ArrayList<Notification> notifications = null;
		try {
			logger.info("retrieving all posts");
			notifications = notificationDao.getAllNotifications();
		} catch (Exception ex) {
			logger.error("Error retrieving all notifications");
			throw ex;
		}
		logger.info("successfully retrieved notifications");
		return notifications;
	}
	
	/**
	 * Find By User
	 * @throws Exception 
	 */
	@RequestMapping(value = "/notification/findByUser", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getNotificationForUser(Principal principal) throws Exception {
		Map <String, Object> notificationMap = new HashMap<String, Object>();
		ArrayList<Notification> notifications = null;
		Integer noOfUnRead = 0;
		try {
			logger.info("retrieving all notifications made by: " + principal.getName());
			notifications = notificationDao.getNotificationByUserID(principal.getName());
			noOfUnRead = notificationDao.getCountOfUnread(principal.getName());
		} catch (Exception ex) {
			logger.error("Error retrieving all notifications made by " + principal.getName());
			throw ex;
		}
		notificationMap.put("notifications", notifications);
		notificationMap.put("noOfUnRead", noOfUnRead);
		logger.info("successfully retrieved notifications made by: " + principal.getName());
		return notificationMap;
	}
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    

}
