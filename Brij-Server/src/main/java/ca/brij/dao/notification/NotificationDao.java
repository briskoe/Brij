package ca.brij.dao.notification;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import ca.brij.bean.notification.Notification;

public interface NotificationDao extends JpaRepository<Notification, Long> {

	public ArrayList<Notification> getAllNotifications();

	public ArrayList<Notification> getNotificationByUserID(@Param("userID") String userID);
	
	public Notification getNotificationById(@Param("id") int i);
	
	public Integer getCountOfUnread(@Param("userID") String userID);
}
