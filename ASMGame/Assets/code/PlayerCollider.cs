using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Mime;
using UnityEngine;
using UnityEngine.UI;

public class PlayerCollider : MonoBehaviour
{
    [SerializeField] private Text locationText;//hien thi va cham voi doi tuong nao
    public AudioClip collectSound;//doi tuong quan ly am thanh
    // public AudioClip Ston;
    private bool hitStone = true;//kiem tra xem co va vaof Stone
    //dinh nghia ham xu ly va cham
    private void OnControllerColliderHit(ControllerColliderHit hit)
    {
        if(hit.gameObject.tag=="Coin")//va cham coin
        {
            SoundManager.Instance.PlaySound(collectSound);
            //bat am thanh
            hit.gameObject.GetComponent<Coin>().Death();
            //tang 1 diem
            GetComponent<ScoreManager>().tangDiem(1);

        }
        if(hit.gameObject.tag=="Stone")//neu va phai da
        {
            if(hitStone)
            {
                // SoundManager.Instance.PlaySound(Ston);
                //dieu chinh suc khoe nhan vat: va cham Stone truc 10 diem
                GetComponent<PLayerHealth>().ModifyHealth(-10);
                //dua vao khoi lap de xu ly bang cach goi khoi lap
                StartCoroutine(EnableCollider(hit, 1));//goi da tien trinh
            }
        }
        //cap nhat text
        if(hit.gameObject.tag=="MushroomLocation")
        {
            locationText.text = "Va Cham Voi: Mushroom";
        }
        if (hit.gameObject.tag == "StoneLocation")
        {
            locationText.text = "Va Cham Voi: Stone";
        }
        if (hit.gameObject.tag == "FireLocation")
        {
            locationText.text = "Va Cham Voi: Fire";
        }
        if (hit.gameObject.tag == "HouseLocation")
        {
            locationText.text = "Va Cham Voi: House";
        }
    }
    //dinh ngia ham goi khoi lam yield
    private IEnumerator EnableCollider(ControllerColliderHit hit, float second)
    {
        hitStone = false;
        yield return new WaitForSeconds(second);//khoi lap
        hitStone = true;
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
