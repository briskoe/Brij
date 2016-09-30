package ca.brij.bean.posting;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;


@Entity
@NamedQueries({ @NamedQuery(name = "Posting.getAllPostings", query = "from Posting"),
		@NamedQuery(name = "Posting.getPostingById", query = "from Posting where id = :id"),
		@NamedQuery(name = "Posting.getPostingsByUserID", query = "from Posting where userID = :userID") })
@Table(name = "posting", indexes = { @Index(name = "posting_userIdInd", columnList = "userID"),
		@Index(name = "posting_nameInd", columnList = "title") })
@DynamicUpdate
public class Posting implements Serializable{

	private static final long serialVersionUID = 8816634543519363815L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Integer id;

	@Column(name = "title", nullable = false)
	private String title;

	// get this from the form (dropdown has values);
	@Column(name = "servID", nullable = false)
	private String servID;

	@Column(name = "userID", nullable = false)
	private String userID;

	@Column(name = "details", columnDefinition = "TEXT")
	private String details;

	@Column(name = "isPost")
	private Boolean isPost;
	
	public Posting() {
	}

	public Posting(Integer id, String name) {
		this.id = id;
		this.title = name;
	}

	public Posting(Integer id, String name, String userID, String servID) {
		this.id = id;
		this.title = name;
		this.userID = userID;
		this.servID = servID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getServID() {
		return servID;
	}

	public void setServID(String servID) {
		this.servID = servID;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public Boolean getIsPost() {
		return isPost;
	}

	public void setIsPost(Boolean isPost) {
		this.isPost = isPost;
	}

}