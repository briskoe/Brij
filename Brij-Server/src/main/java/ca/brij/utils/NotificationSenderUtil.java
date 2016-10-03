package ca.brij.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Repository;

import ca.brij.bean.notification.Notification;
import ca.brij.dao.notification.NotificationDao;

@Repository
@Configurable
public class NotificationSenderUtil {
	
	@Autowired
	private  NotificationDao notificationDao;
	
	@Autowired
	public NotificationSenderUtil(NotificationDao dao){
		this.notificationDao = dao;
	}
	
	public void makeNotification(Notification notification){
		notificationDao.save(notification);
	}
	public void makeNotification(String userID, String type, Integer targetID, String description){
		makeNotification(new Notification(userID, type, targetID, description));
	}

	public  NotificationDao getNotificationDao() {
		return notificationDao;
	}
	
	public  void setNotificationDao(NotificationDao notificationDao) {
		this.notificationDao = notificationDao;
	}

	public static final String REQUEST_TYPE = "request";

}
