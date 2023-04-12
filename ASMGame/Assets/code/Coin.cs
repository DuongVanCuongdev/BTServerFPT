using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Coin : MonoBehaviour
{
    private MeshCollider MeshCollider;

    private void Awake()
    {
        MeshCollider = GetComponent<MeshCollider>();
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        transform.Rotate(Vector3.right,1);
    }

    public void Death()
    {
        Destroy(gameObject);
    }
}
