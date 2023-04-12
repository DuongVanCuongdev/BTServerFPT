using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class TilesManager : MonoBehaviour
{
    public GameObject[] tilesPrefabs; //mang dia hinh

    private Transform player;// nhân vat

    private List<GameObject> activeTiles;// cac dia hinh dang active
    private float spawnZ = 0f;//khoang cach bien doi
    private float tileLength = 44f; //chieu dai dia hinh

    private int tilesOnScreen = 4;// so dịa hinh hien thi dong thoi tren man hinh
    // ham tao dia hinh sau khi nv di chuyen
    private void TaoDiaHinh(int index = 1)
    {
        GameObject gameObject;
        if (index == 2)// chi so = 0 -> thanh phan đau tien của mang'
        {
            gameObject = Instantiate(tilesPrefabs[0]);//dua dia hinh so 0 vao
        }
        else//lay ngau nhien 1 dia hinh
        {
            gameObject = Instantiate(tilesPrefabs[Random.Range(1, tilesPrefabs.Length)]);
        }
        //dua dia hinnh moi tao vao game
        gameObject.transform.SetParent(transform);
        // thuc hien bien doi dia hinh
        gameObject.transform.position = Vector3.forward * spawnZ;
        // xac dinh vi tri mới
        spawnZ += tileLength;
        // dua dia hinh vao mang
        activeTiles.Add(gameObject);
    }
    
    //ham xoa dia hinh
    private void XoaDiaHinh()
    {
        Destroy(activeTiles[0]);//huy
        activeTiles.RemoveAt(0);//xoa trong mang
    }
    
    // Start is called before the first frame update
    void Start()
    {
        //khoi tạo cac bien
        activeTiles = new List<GameObject>();//khoi tao danh sach dia hinh
        player = GameObject.FindGameObjectWithTag("Player").transform;// anh xa
        // su dung vao lap de khoi tao dia hinh
        for (int i = 0; i < tilesOnScreen; i++)
        {
            if (i < 1)
            {
                TaoDiaHinh(0);
            }
            else
            {
                TaoDiaHinh();
            }
        }
    }

    // Update is called once per frame
    void Update()
    {
        // tao dia hinh khi nhan vat den va xoa khi nhan vat di qua
        // dk tao dia hinh
        if ((player.position.z - tileLength)> (spawnZ-tileLength*tilesOnScreen))
        {
            TaoDiaHinh();// tao dia hinh khi nv den
            XoaDiaHinh();// xoa khi nv di qua
        }
    }
}
